import React from "react";
import { importTeamLogos } from "../helpers/image.helper";
import { PlayersInfoConsumer } from "./PlayersProvider";

const teamLogos: { [key: string]: string } = importTeamLogos(
    require.context("../static", false, /\.(svg)$/)
);

const statCard = {
    background: "#27293d",
    marginBottom: "30px",
    fontSize: "1.4375rem",
    border: 0
};

const statCardBody = {
    paddingBottom: "0px",
    paddingTop: "5px"
};

const statCardFooter = {
    background: "#27293d",
    border: 0,
    color: "white"
};

const teamIcon = {
    maxHeight: "65px",
    marginLeft: "-15px",
    marginTop: "0px"
};

const cardInfoSection = {
    textAlign: "left"
} as React.CSSProperties;

const cardStatisticSection = {
    paddingLeft: "0px",
    textAlign: "right"
} as React.CSSProperties;

const cardCategory = {
    fontSize: "0.8rem",
    marginBottom: "0px",
    marginTop: "-10px"
};

const cardDate = {
    fontSize: "0.75rem",
    marginBottom: "30px",
    marginTop: "0px"
};

const divder = {
    borderColor: "#525F7F",
    marginBottom: "0px"
};

interface Props {
    footerText: string;
    statistics: [
        {
            stat: number;
            player_id: number;
        }
    ];
    categoryAbbreviation: string;
}

interface State {}

export default class Index extends React.Component<Props, State> {
    public static contextType = PlayersInfoConsumer;
    constructor(props: Props, state: State) {
        super(props, state);
    }

    public getTeamLogo(team: string) {
        return teamLogos[team];
    }

    public render() {
        this.props.statistics.sort(function(a, b) {
            return b.stat - a.stat;
        });
        return (
            <div className="col-lg-4 col-md-6">
                <div className="card" style={statCard}>
                    {this.props.statistics.map(stat => {
                        const playerInfo = this.context.playersInfo.find(
                            player => player.id === stat.player_id
                        );

                        return (
                            <div className="card-body" style={statCardBody}>
                                <div className="row">
                                    <div
                                        className="col-8 text-light"
                                        style={cardInfoSection}>
                                        <div className="column">
                                            <img
                                                style={teamIcon}
                                                src={this.getTeamLogo(
                                                    playerInfo.team.abbreviation
                                                )}
                                            />
                                            <h2 style={{ fontSize: "1.2rem" }}>
                                                {playerInfo.first_name +
                                                    " " +
                                                    playerInfo.last_name}
                                            </h2>
                                        </div>
                                    </div>
                                    <div
                                        className="col-4"
                                        style={cardStatisticSection}>
                                        <div className="column">
                                            <p
                                                className="text-light"
                                                style={cardDate}>
                                                2018/ 2019
                                            </p>
                                            <h3 className="h3 text-light">
                                                {stat.stat}
                                            </h3>
                                            <p
                                                className="text-light"
                                                style={cardCategory}>
                                                {
                                                    this.props
                                                        .categoryAbbreviation
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <hr style={divder} />
                            </div>
                        );
                    })}
                    <div className="card-footer" style={statCardFooter}>
                        {this.props.footerText}
                    </div>
                </div>
            </div>
        );
    }
}
