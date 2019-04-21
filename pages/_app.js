
import React from 'react'
import App, { Container } from 'next/app'
import Layout from '../components/Layout'

export default class MyApp extends App {
    constructor(props) {
        super(props);
        
        this.state = {
            playerInfo: null
        };
        this.setPlayerInfo = this.setPlayerInfo.bind(this)
    }


    setPlayerInfo = (playerInfo) => {
        this.setState({playerInfo: playerInfo});
    }

    render () {
        const { Component, pageProps } = this.props
        return (
        <Container>
            <Layout>
            <Component onResultRoute={this.setPlayerInfo} playerInfo={this.state.playerInfo} {...pageProps} />
            </Layout>
        </Container>
        )
    }
}
