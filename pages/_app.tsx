import App, { Container } from "next/app";
import React from "react";
import Layout from "../components/Layout";
import PlayersInfoProvider from "../components/PlayersProvider";
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
    }

    public render() {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <PlayersInfoProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </PlayersInfoProvider>
            </Container>
        );
    }
}
