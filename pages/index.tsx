import Router from "next/router";
import React from "react";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import { PlayersInfoContext } from "../components/PlayersProvider";
import QuickSearchItems from "../components/QuickSearch/QuickSearchItems";
import QuickSearchComparisonItems from "../components/QuickSearchComparison/QuickSearchComparisonItems";
import Search from "../components/Search";
import WarningAlert from "../components/WarningAlert";
import { Player } from "../models/player";

const playerLimit = 10;

const HomePage = styled.div`
    background: ${props => props.theme.primary};
    min-height: 100vh;
`;

const H1 = styled.h1`
    font-family: "Ubuntu", sans-serif;
`;

const H4 = styled.h4`
    font-family: "Ubuntu", sans-serif;
`;

interface State {
    isLoading: boolean;
    players: Player[];
    quickSearchDisabled: boolean;
}

export default class Index extends React.Component {
    public static contextType = PlayersInfoContext;

    public state = {
        isLoading: true,
        players: [],
        quickSearchDisabled: true
    };

    public render() {
        const searchPlayer = (players: Player[]) => {
            this.context.addPlayerInfo(players);
            Router.push({
                pathname: "/results"
            });
        };

        const quickSearchPlayer = (player: Player) => {
            this.context.addPlayerInfo([player]);

            Router.push({
                pathname: "/results"
            });
        };

        const quickSearchPlayerComparison = (players: Player[]) => {
            this.context.setPlayersInfo(players);

            Router.push({
                pathname: "/results"
            });
        };

        let limitWarning = null;
        if (this.context.playersInfo.length >= playerLimit) {
            limitWarning = (
                <Row className="justify-content-center">
                    <WarningAlert
                        text={`Cannot search for more than ${playerLimit} players`}
                    />
                </Row>
            );
        }

        return (
            <HomePage className="position-relative overflow-hidden text-center">
                <div className="col-md-5 mx-auto my-5">
                    <H1 className="display-4 text-light">Swish Stats</H1>
                </div>
                <div className="col-lg-5 my-5 container">
                    <Search searchPlayer={searchPlayer} />
                </div>
                <H4 className="display-12 text-light">Quick Search</H4>
                {limitWarning}
                <Row className="col-sm-12 justify-content-center">
                    <QuickSearchItems
                        onClick={quickSearchPlayer}
                        numberOfItems={5}
                    />
                </Row>
                <Row className="col-sm-12 justify-content-center">
                    <QuickSearchComparisonItems
                        onClick={quickSearchPlayerComparison}
                        numberOfItems={4}
                    />
                </Row>
            </HomePage>
        );
    }
}
