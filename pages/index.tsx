import Router from "next/router";
import React from "react";
import styled from "styled-components";
import { PlayersInfoConsumer } from "../components/PlayersProvider";
import Search from "../components/Search";
import { Player } from "../models/player";

const HomePage = styled.div`
    background: ${props => props.theme.primary};
    height: 100vh;
`;

const H1 = styled.h1`
    font-family: "Ubuntu", sans-serif;
`;

const fontPrimary = {} as React.CSSProperties;

interface Props {}

interface State {}

export default class Index extends React.Component<Props, State> {
    public static contextType = PlayersInfoConsumer;
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            isLoading: false,
            options: []
        };
        this.searchPlayer = this.searchPlayer.bind(this);
    }

    public searchPlayer(players: Player[]) {
        this.context.addPlayerInfo(players[0]);
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
                <div className="col-lg-5 container">
                    <Search searchPlayer={this.searchPlayer} />
                </div>
            </HomePage>
        );
    }
}
