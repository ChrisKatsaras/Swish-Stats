import Router from "next/router";
import React from "react";
import styled from "styled-components";
import PlayerButton from "../components/PlayerButton";
import PlayerModal from "../components/PlayerModal";
import { PlayersInfoContext } from "../components/PlayersProvider";
import StatCard from "../components/StatCard/StatCard";
import { importTeamLogos } from "../helpers/image.helper";
import { getPlayersSeasonAverages } from "../helpers/stat.helper";
import { Player } from "../models/player";

const teamLogos: { [key: string]: string } = importTeamLogos(
    require.context("../static", false, /\.(svg)$/)
);

const ResultsPage = styled.div`
    background: ${props => props.theme.primary};
    min-height: 100vh;
    padding-left: 30px;
    padding-right: 30px;
`;

const Loader = styled.div`
    position: fixed;
    z-index: 999;
    height: 2em;
    width: 2em;
    overflow: visible;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

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
            playerIds: [],
            playerSeasonAverages: null
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

    public componentDidUpdate() {
        // Get a list of all player ids currently in context
        const playerIds: number[] = this.context.playersInfo.map(
            (player: Player) => {
                return player.id;
            }
        );

        // If there are less players to examine, no need to make an api call
        if (this.state.playerIds.length > playerIds.length) {
            this.setState({ playerIds });
        } else if (!this.areArraysEqual(this.state.playerIds, playerIds)) {
            this.setState({ playerIds });
            if (this.context.playersInfo.length > 0) {
                getPlayersSeasonAverages(2018, playerIds).then(res => {
                    this.setState({ playerSeasonAverages: res });
                });
            }
        }

        // If there are no players left in context, route user back to homepage
        if (this.context.playersInfo.length === 0) {
            Router.push({
                pathname: "/"
            });
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
                <ResultsPage className="position-relative overflow-hidden text-light text-center">
                    <Loader
                        className="spinner-grow col-md-5 p-lg-5 mx-auto my-5"
                        role="status"
                    />
                </ResultsPage>
            );
        }

        if (
            !this.state.playerSeasonAverages ||
            this.state.playerSeasonAverages.length === 0
        ) {
            return (
                <ResultsPage className="position-relative overflow-hidden text-light text-center">
                    <h1 className="col-md-5 p-lg-5 mx-auto my-5">
                        No 2018 data found for this player
                    </h1>
                </ResultsPage>
            );
        }

        const mpgCollator = new Intl.Collator(undefined, {
            numeric: true,
            sensitivity: "base"
        });

        return (
            <ResultsPage className="position-relative overflow-hidden text-center">
                <div className="mx-auto my-5">
                    <PlayerButton onClick={this.onClick} />
                    <PlayerModal ref={this.child} />
                    <div className="row">
                        <StatCard
                            categoryAbbreviation={"ppg"}
                            statistics={this.state.playerSeasonAverages
                                .map(({ player_id, pts }) => ({
                                    player_id,
                                    stat: pts
                                }))
                                .sort((a, b) => {
                                    return b.stat - a.stat;
                                })}
                            footerText="Points Per Game"
                        />
                        <StatCard
                            categoryAbbreviation={"rpg"}
                            statistics={this.state.playerSeasonAverages
                                .map(({ player_id, reb }) => ({
                                    player_id,
                                    stat: reb
                                }))
                                .sort((a, b) => {
                                    return b.stat - a.stat;
                                })}
                            footerText="Rebounds Per Game"
                        />
                        <StatCard
                            categoryAbbreviation={"apg"}
                            statistics={this.state.playerSeasonAverages
                                .map(({ player_id, ast }) => ({
                                    player_id,
                                    stat: ast
                                }))
                                .sort((a, b) => {
                                    return b.stat - a.stat;
                                })}
                            footerText="Assists Per Game"
                        />
                        <StatCard
                            categoryAbbreviation={"mpg"}
                            statistics={this.state.playerSeasonAverages
                                .map(({ player_id, min }) => ({
                                    player_id,
                                    stat: min
                                }))
                                .sort((a, b) => {
                                    return mpgCollator.compare(b.stat, a.stat);
                                })}
                            footerText="Minutes Per Game"
                        />
                        <StatCard
                            categoryAbbreviation={"bpg"}
                            statistics={this.state.playerSeasonAverages
                                .map(({ player_id, blk }) => ({
                                    player_id,
                                    stat: blk
                                }))
                                .sort((a, b) => {
                                    return b.stat - a.stat;
                                })}
                            footerText="Blocks Per Game"
                        />
                        <StatCard
                            categoryAbbreviation={"stl"}
                            statistics={this.state.playerSeasonAverages
                                .map(({ player_id, stl }) => ({
                                    player_id,
                                    stat: stl
                                }))
                                .sort((a, b) => {
                                    return b.stat - a.stat;
                                })}
                            footerText="Steals Per Game"
                        />
                    </div>
                </div>
                <div className="product-device shadow-sm d-none d-md-block" />
                <div className="product-device product-device-2 shadow-sm d-none d-md-block" />
            </ResultsPage>
        );
    }

    private areArraysEqual(firstArray: any, secondArray: any) {
        if (firstArray.length !== secondArray.length) return false;

        for (let i = firstArray.length; i--; ) {
            if (firstArray[i] !== secondArray[i]) return false;
        }

        return true;
    }
}
