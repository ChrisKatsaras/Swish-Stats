import Router from "next/router";
import React from "react";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import ClearAllChip from "../components/ClearAllChip/ClearAllChip";
import PlayerChip from "../components/PlayerChip/PlayerChip";
import { PlayersInfoContext } from "../components/PlayersProvider";
import StatCard from "../components/StatCard/StatCard";
import { getPlayersSeasonAverages } from "../helpers/stat.helper";
import { Player } from "../models/player";
import { getCurrentSeasonYear } from "../helpers/date.helper";

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

const currentYear = getCurrentSeasonYear();

interface State {
    playerSeasonAverages: any;
    isLoading: boolean;
    playerIds: number[];
}

export default class Results extends React.Component<{}, State> {
    public static contextType = PlayersInfoContext;
    constructor(props: {}, state: State) {
        super(props, state);
        this.state = {
            isLoading: false,
            playerIds: [],
            playerSeasonAverages: null
        };

        this.removePlayer = this.removePlayer.bind(this);
        this.clearAllPlayers = this.clearAllPlayers.bind(this);
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
            getPlayersSeasonAverages(currentYear, playerIds).then(res => {
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
                this.setState({ isLoading: true });
                getPlayersSeasonAverages(currentYear, playerIds).then(res => {
                    this.setState({ playerSeasonAverages: res });
                    this.setState({ isLoading: false });
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

    public removePlayer(playerId: number) {
        this.context.removePlayerInfo(playerId);
    }

    public clearAllPlayers(): void {
        this.context.setPlayersInfo([]);
    }

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
                <ResultsPage className="position-relative overflow-hidden text-center" />
            );
        }

        const mpgCollator = new Intl.Collator(undefined, {
            numeric: true,
            sensitivity: "base"
        });

        return (
            <ResultsPage className="position-relative overflow-hidden">
                <div className="my-4">
                    <div className="mr-auto">
                        {this.context.playersInfo.map((player: Player) => {
                            return (
                                <PlayerChip
                                    key={player.id}
                                    onClick={this.removePlayer}
                                    player={player}
                                />
                            );
                        })}
                        <ClearAllChip onClick={this.clearAllPlayers} />
                    </div>
                    <Row>
                        <StatCard
                            categoryAbbreviation={"ppg"}
                            statistics={this.state.playerSeasonAverages
                                .map(
                                    ({
                                        player_id,
                                        pts
                                    }: {
                                        player_id: number;
                                        pts: number;
                                    }) => ({
                                        player_id,
                                        stat: pts
                                    })
                                )
                                .sort((a: any, b: any) => {
                                    return b.stat - a.stat;
                                })}
                            footerText="Points Per Game"
                        />
                        <StatCard
                            categoryAbbreviation={"rpg"}
                            statistics={this.state.playerSeasonAverages
                                .map(
                                    ({
                                        player_id,
                                        reb
                                    }: {
                                        player_id: number;
                                        reb: number;
                                    }) => ({
                                        player_id,
                                        stat: reb
                                    })
                                )
                                .sort((a: any, b: any) => {
                                    return b.stat - a.stat;
                                })}
                            footerText="Rebounds Per Game"
                        />
                        <StatCard
                            categoryAbbreviation={"apg"}
                            statistics={this.state.playerSeasonAverages
                                .map(
                                    ({
                                        player_id,
                                        ast
                                    }: {
                                        player_id: number;
                                        ast: number;
                                    }) => ({
                                        player_id,
                                        stat: ast
                                    })
                                )
                                .sort((a: any, b: any) => {
                                    return b.stat - a.stat;
                                })}
                            footerText="Assists Per Game"
                        />
                        <StatCard
                            categoryAbbreviation={"mpg"}
                            statistics={this.state.playerSeasonAverages
                                .map(
                                    ({
                                        player_id,
                                        min
                                    }: {
                                        player_id: number;
                                        min: string;
                                    }) => ({
                                        player_id,
                                        stat: min
                                    })
                                )
                                .sort((a: any, b: any) => {
                                    return mpgCollator.compare(b.stat, a.stat);
                                })}
                            footerText="Minutes Per Game"
                        />
                        <StatCard
                            categoryAbbreviation={"bpg"}
                            statistics={this.state.playerSeasonAverages
                                .map(
                                    ({
                                        player_id,
                                        blk
                                    }: {
                                        player_id: number;
                                        blk: number;
                                    }) => ({
                                        player_id,
                                        stat: blk
                                    })
                                )
                                .sort((a: any, b: any) => {
                                    return b.stat - a.stat;
                                })}
                            footerText="Blocks Per Game"
                        />
                        <StatCard
                            categoryAbbreviation={"spg"}
                            statistics={this.state.playerSeasonAverages
                                .map(
                                    ({
                                        player_id,
                                        stl
                                    }: {
                                        player_id: number;
                                        stl: number;
                                    }) => ({
                                        player_id,
                                        stat: stl
                                    })
                                )
                                .sort((a: any, b: any) => {
                                    return b.stat - a.stat;
                                })}
                            footerText="Steals Per Game"
                        />
                    </Row>
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
