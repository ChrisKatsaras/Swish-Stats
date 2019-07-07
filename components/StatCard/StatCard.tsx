import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import teamLogos from "../../helpers/TeamLogos";
import { Player } from "../../models/player";
import { PlayersInfoContext } from "../PlayersProvider";
import CardDate from "./StatCard-Date";
import StatCardDivider from "./StatCard-Divider";
import Footer from "./StatCard-Footer";

const Card = styled.div`
    background: ${props => props.theme.secondary};
    margin-bottom: 30px;
    font-size: 1.4375rem;
    border: 0;
`;

const StatCardBody = styled.div`
    padding-bottom: 0px;
    padding-top: 5px;
`;

const TeamLogo = styled.img`
    max-height: 65px;
    margin-left: -15px;
    margin-top: 0px;
`;

const H4 = styled.h4`
    font-size: 1.2rem;
`;

const CardInfo = styled.div`
    text-align: left;
`;

const CardStatistic = styled.div`
    padding-left: 0px;
    text-align: right;
`;

const CardCategory = styled.p`
    font-size: 0.8rem;
    margin-bottom: 0px;
    margin-top: -10px;
`;

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

const StatCard = (props: Props) => {
    const { footerText, statistics, categoryAbbreviation } = props;
    const playerContext = useContext(PlayersInfoContext);

    return (
        <div className="col-lg-4 col-md-6">
            <Card className="card">
                {statistics.map(stat => {
                    const playerInfo = playerContext.playersInfo.find(
                        (player: Player) => player.id === stat.player_id
                    );

                    if (!playerInfo) {
                        return null;
                    }

                    return (
                        <StatCardBody
                            key={stat.player_id}
                            className="card-body">
                            <Row>
                                <CardInfo className="col-8 text-light">
                                    <div className="column">
                                        <TeamLogo
                                            src={
                                                teamLogos[
                                                    playerInfo.team.abbreviation
                                                ]
                                            }
                                        />
                                        <H4>
                                            {`${playerInfo.first_name}
                                                ${playerInfo.last_name}`}
                                        </H4>
                                    </div>
                                </CardInfo>
                                <CardStatistic className="col-4">
                                    <div className="column">
                                        <CardDate date="2018 / 2019" />
                                        <h3 className="h3 text-light">
                                            {stat.stat}
                                        </h3>
                                        <CardCategory className="text-light">
                                            {categoryAbbreviation}
                                        </CardCategory>
                                    </div>
                                </CardStatistic>
                            </Row>
                            <StatCardDivider />
                        </StatCardBody>
                    );
                })}
                <Footer footerText={footerText} />
            </Card>
        </div>
    );
};

export default StatCard;
