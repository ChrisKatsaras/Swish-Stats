
import React from 'react'
import App, { Container } from 'next/app'
import Layout from '../components/Layout'
import { Player } from '../models/player';

type Props = {
    pageProps: any,
    Component: any,
    router: any
};

type State = {
    playerInfo: Player | null;
};

export default class MyApp extends App<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            playerInfo: null
        };
        this.setPlayerInfo = this.setPlayerInfo.bind(this);
    }

    setPlayerInfo = (playerInfo: Player) => {
        this.setState({ playerInfo });
    }

    render () {

        const { Component, pageProps } = this.props;
        return (
            <Container>
                <Layout>
                    <Component onResultRoute={this.setPlayerInfo} playerInfo={this.state.playerInfo} {...pageProps} />
                </Layout>
            </Container>
        );
    }
}
