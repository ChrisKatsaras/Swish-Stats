import Router from "next/router";
import React from "react";
import StatCard from "../components/StatCard";
import { importTeamLogos } from "../helpers/image.helper";
import {
    calculateSeasonTotals,
    getPlayersSeasonTotal
} from "../helpers/stat.helper";
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

interface Props {
    playerInfo: Player;
}

interface State {
    playerSeasonTotals: any;
    playerSeasonAverages: any;
}

export default class Results extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            playerSeasonAverages: null,
            playerSeasonTotals: null
        };
    }

    public componentDidMount() {
        if (this.props.playerInfo != null) {
            calculateSeasonTotals(this.props.playerInfo.id).then(res => {
                this.setState({ playerSeasonTotals: res });
            });

            getPlayersSeasonTotal(2018, this.props.playerInfo.id).then(res => {
                this.setState({ playerSeasonAverages: res[0] });
            });
        } else {
            Router.push({
                pathname: "/"
            });
        }
    }

    public getTeamLogo(team: string) {
        return teamLogos[team];
    }

    public render() {
        if (!this.state.playerSeasonTotals) {
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
                    <div className="row">
                        <StatCard
                            categoryAbbreviation={"ppg"}
                            logo={this.getTeamLogo(
                                this.props.playerInfo.team.abbreviation
                            )}
                            playerName={
                                this.props.playerInfo.first_name +
                                " " +
                                this.props.playerInfo.last_name
                            }
                            footerText="Points Per Game"
                            statistic={this.state.playerSeasonAverages.pts}
                        />
                        <StatCard
                            categoryAbbreviation={"rbg"}
                            logo={this.getTeamLogo(
                                this.props.playerInfo.team.abbreviation
                            )}
                            playerName={
                                this.props.playerInfo.first_name +
                                " " +
                                this.props.playerInfo.last_name
                            }
                            footerText="Rebounds Per Game"
                            statistic={this.state.playerSeasonAverages.reb}
                        />
                        <StatCard
                            categoryAbbreviation={"apg"}
                            logo={this.getTeamLogo(
                                this.props.playerInfo.team.abbreviation
                            )}
                            playerName={
                                this.props.playerInfo.first_name +
                                " " +
                                this.props.playerInfo.last_name
                            }
                            footerText="Assists Per Game"
                            statistic={this.state.playerSeasonAverages.ast}
                        />
                        <StatCard
                            categoryAbbreviation={"mpg"}
                            logo={this.getTeamLogo(
                                this.props.playerInfo.team.abbreviation
                            )}
                            playerName={
                                this.props.playerInfo.first_name +
                                " " +
                                this.props.playerInfo.last_name
                            }
                            footerText="Minutes Per Game"
                            statistic={this.state.playerSeasonAverages.min}
                        />
                        <StatCard
                            categoryAbbreviation={"spg"}
                            logo={this.getTeamLogo(
                                this.props.playerInfo.team.abbreviation
                            )}
                            playerName={
                                this.props.playerInfo.first_name +
                                " " +
                                this.props.playerInfo.last_name
                            }
                            footerText="Steals Per Game"
                            statistic={this.state.playerSeasonAverages.stl}
                        />
                        <StatCard
                            categoryAbbreviation={"bpg"}
                            logo={this.getTeamLogo(
                                this.props.playerInfo.team.abbreviation
                            )}
                            playerName={
                                this.props.playerInfo.first_name +
                                " " +
                                this.props.playerInfo.last_name
                            }
                            footerText="Blocks Per Game"
                            statistic={this.state.playerSeasonAverages.blk}
                        />
                    </div>
                </div>
                <div className="product-device shadow-sm d-none d-md-block" />
                <div className="product-device product-device-2 shadow-sm d-none d-md-block" />
            </div>
        );
    }
}
