import Router from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import UserPlus from "react-feather/dist/icons/user-plus";
import PlayerModal from "../components/PlayerModal";
import { PlayersInfoContext } from "../components/PlayersProvider";
import StatCard from "../components/StatCard";
import { importTeamLogos } from "../helpers/image.helper";
import { getPlayersSeasonAverages } from "../helpers/stat.helper";
import { Player } from "../models/player";

const teamLogos: { [key: string]: string } = importTeamLogos(
    require.context("../static", false, /\.(svg)$/)
);

const masthead = {
    background: "#1e1e2f",
    minHeight: "100vh",
    paddingLeft: "30px",
    paddingRight: "30px"
};

const loader = {
    position: "fixed",
    zindex: "999",
    height: "2em",
    width: "2em",
    overflow: "visible",
    margin: "auto",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0"
} as React.CSSProperties;

const playerButton = {
    position: "fixed",
    right: 0,
    width: "64px",
    background: "rgba(0, 0, 0, 0.3)",
    zIndex: 1031,
    borderRadius: "8px 0 0 8px",
    textAlign: "center",
    top: "30px",
    border: "none"
};

interface Props {}

interface State {
    playerSeasonAverages: any;
    isLoading: boolean;
    playerIds: number[];
}

export default class Results extends React.Component<Props, State> {
    public static contextType = PlayersInfoContext;
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            isLoading: false,
            playerSeasonAverages: null,
            playerIds: []
        };
        this.child = React.createRef();
    }

    public componentDidMount() {
        const playerIds: number[] = this.context.playersInfo.map(
            (player: Player) => {
                return player.id;
            }
        );

        this.setState({ playerIds });

        if (this.context.playersInfo.length > 0) {
            this.setState({ isLoading: true });
            getPlayersSeasonAverages(2018, playerIds).then(res => {
                this.setState({ playerSeasonAverages: res });
                this.setState({ isLoading: false });
            });
        } else {
            Router.push({
                pathname: "/"
            });
        }
    }

    public componentDidUpdate(prevProps) {
        const playerIds: number[] = this.context.playersInfo.map(
            (player: Player) => {
                return player.id;
            }
        );

        if (!this.arraysEqual(this.state.playerIds, playerIds)) {
            this.setState({ playerIds });
            if (this.context.playersInfo.length > 0) {
                getPlayersSeasonAverages(2018, playerIds).then(res => {
                    this.setState({ playerSeasonAverages: res });
                });
            } else {
                Router.push({
                    pathname: "/"
                });
            }
        }
    }

    public getTeamLogo(team: string) {
        return teamLogos[team];
    }

    public onClick = () => {
        this.child.current.showModal();
    };

    public render() {
        if (this.state.isLoading) {
            return (
                <div
                    style={masthead}
                    className="position-relative overflow-hidden text-light text-center">
                    <div
                        style={loader}
                        className="spinner-grow col-md-5 p-lg-5 mx-auto my-5"
                        role="status"
                    />
                </div>
            );
        }

        if (!this.state.playerSeasonAverages) {
            return (
                <div
                    style={masthead}
                    className="position-relative overflow-hidden text-light text-center">
                    <h1 className="col-md-5 p-lg-5 mx-auto my-5">
                        No 2018 data found for this player
                    </h1>
                </div>
            );
        }

        return (
            <div
                style={masthead}
                className="position-relative overflow-hidden text-center">
                <div className="mx-auto my-5">
                    <Button style={playerButton} onClick={this.onClick}>
                        <UserPlus color="white" />
                    </Button>
                    <PlayerModal ref={this.child} />
                    <div className="row">
                        <StatCard
                            categoryAbbreviation={"ppg"}
                            statistics={this.state.playerSeasonAverages.map(
                                ({ player_id, pts }) => ({
                                    player_id,
                                    stat: pts
                                })
                            )}
                            footerText="Points Per Game"
                        />
                        <StatCard
                            categoryAbbreviation={"rpg"}
                            statistics={this.state.playerSeasonAverages.map(
                                ({ player_id, reb }) => ({
                                    player_id,
                                    stat: reb
                                })
                            )}
                            footerText="Rebounds Per Game"
                        />
                        <StatCard
                            categoryAbbreviation={"apg"}
                            statistics={this.state.playerSeasonAverages.map(
                                ({ player_id, ast }) => ({
                                    player_id,
                                    stat: ast
                                })
                            )}
                            footerText="Assists Per Game"
                        />
                        <StatCard
                            categoryAbbreviation={"mpg"}
                            statistics={this.state.playerSeasonAverages.map(
                                ({ player_id, min }) => ({
                                    player_id,
                                    stat: min
                                })
                            )}
                            footerText="Minutes Per Game"
                        />
                        <StatCard
                            categoryAbbreviation={"blk"}
                            statistics={this.state.playerSeasonAverages.map(
                                ({ player_id, blk }) => ({
                                    player_id,
                                    stat: blk
                                })
                            )}
                            footerText="Blocks Per Game"
                        />
                        <StatCard
                            categoryAbbreviation={"stl"}
                            statistics={this.state.playerSeasonAverages.map(
                                ({ player_id, stl }) => ({
                                    player_id,
                                    stat: stl
                                })
                            )}
                            footerText="Steals Per Game"
                        />
                    </div>
                </div>
                <div className="product-device shadow-sm d-none d-md-block" />
                <div className="product-device product-device-2 shadow-sm d-none d-md-block" />
            </div>
        );
    }

    private arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = arr1.length; i--; ) {
            if (arr1[i] !== arr2[i]) return false;
        }

        return true;
    }
}
