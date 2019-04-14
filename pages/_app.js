
import React from 'react'
import App, { Container } from 'next/app'
import Layout from '../components/Layout'

export default class MyApp extends App {
    constructor(props) {
        super(props);
        
        this.state = {
            playerId: null
        };
        this.setPlayerId = this.setPlayerId.bind(this)
    }


    setPlayerId = (id) => {
        this.setState({playerId: id});
    }

    render () {
        const { Component, pageProps } = this.props
        return (
        <Container>
            <Layout>
            <Component onResultRoute={this.setPlayerId} playerId={this.state.playerId} {...pageProps} />
            </Layout>
        </Container>
        )
    }
}
