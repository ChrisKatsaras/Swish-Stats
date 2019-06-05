import Router from "next/router";
import React from "react";
import { PlayersInfoConsumer } from "../components/PlayersProvider";
import Search from "../components/Search";
import { Player } from "../models/player";

const masthead = {
    background: "#1e1e2f",
    height: "100vh"
};

const fontPrimary = {
    fontFamily: "'Ubuntu', sans-serif",
    fontWeight: "bold"
} as React.CSSProperties;

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
            <div
                style={masthead}
                className="position-relative overflow-hidden text-center">
                <div className="col-md-5 mx-auto my-5">
                    <h1 className="display-4 text-light" style={fontPrimary}>
                        Swish Stats
                    </h1>
                </div>
                <div className="col-lg-5 container">
                    <Search searchPlayer={this.searchPlayer} />
                </div>
            </div>
        );
    }
}
