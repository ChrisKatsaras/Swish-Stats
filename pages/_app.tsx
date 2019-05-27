import App, { Container } from "next/app";
import React from "react";
import Layout from "../components/Layout";
import { Player } from "../models/player";

interface Props {
    pageProps: any;
    Component: any;
    router: any;
}

interface State {
    playerInfo: Player | null;
}

export default class MyApp extends App<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            playerInfo: null
        };
        this.setPlayerInfo = this.setPlayerInfo.bind(this);
    }

    public setPlayerInfo = (playerInfo: Player) => {
        this.setState({ playerInfo });
    };

    public render() {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <Layout>
                    <Component
                        onResultRoute={this.setPlayerInfo}
                        playerInfo={this.state.playerInfo}
                        {...pageProps}
                    />
                </Layout>
            </Container>
        );
    }
}
