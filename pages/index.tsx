import Router from "next/router";
import React from "react";
import styled from "styled-components";
import { PlayersInfoContext } from "../components/PlayersProvider";
import QuickSearchItems from "../components/QuickSearch/QuickSearchItems";
import QuickSearchComparisonItems from "../components/QuickSearchComparison/QuickSearchComparisonItems";
import Search from "../components/Search";
import { Player } from "../models/player";

const HomePage = styled.div`
    background: ${props => props.theme.primary};
    min-height: 100vh;
`;

const H1 = styled.h1`
    font-family: "Ubuntu", sans-serif;
`;

interface Props {}

interface State {
    isLoading: boolean;
    players: Player[];
    quickSearchDisabled: boolean;
}

export default class Index extends React.Component<Props, State> {
    public static contextType = PlayersInfoContext;

    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            isLoading: true,
            players: [],
            quickSearchDisabled: true
        };
        this.searchPlayer = this.searchPlayer.bind(this);
        this.onClick = this.onClick.bind(this);
        this.searchPlayerComparison = this.searchPlayerComparison.bind(this);
    }

    public searchPlayer(players: Player[]) {
        this.context.addPlayerInfo(players);
        Router.push({
            pathname: "/results"
        });
    }

    public onClick(player: Player) {
        this.context.addPlayerInfo([player]);

        Router.push({
            pathname: "/results"
        });
    }

    public searchPlayerComparison(players: Player[]) {
        this.context.setPlayersInfo(players);

        Router.push({
            pathname: "/results"
        });
    }

    public render() {
        return (
            <HomePage className="position-relative overflow-hidden text-center">
                <div className="col-md-5 mx-auto my-5">
                    <H1 className="display-4 text-light">Swish Stats</H1>
                </div>
                <div className="col-lg-5 my-5 container">
                    <Search searchPlayer={this.searchPlayer} />
                </div>
                <div className="col-sm-12 row justify-content-center">
                    <QuickSearchItems
                        onClick={this.onClick}
                        numberOfItems={5}
                    />
                </div>
                <div className="col-sm-12 row justify-content-center">
                    <QuickSearchComparisonItems
                        onClick={this.searchPlayerComparison}
                        numberOfItems={4}
                    />
                </div>
            </HomePage>
        );
    }
}
