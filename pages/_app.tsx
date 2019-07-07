import App, { Container } from "next/app";
import Router from "next/router";
import React from "react";
import { ThemeProvider } from "styled-components";
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

export default class Application extends App<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
    }

    public componentDidMount() {
        Router.onRouteChangeComplete = url => {
            this.trackPageView(url);
        };
    }

    public trackPageView(url: string) {
        try {
            window.gtag("config", "UA-142981522-1", {
                page_location: url
            });
        } catch (error) {}
    }

    public render() {
        const { Component, pageProps } = this.props;

        const darkTheme = {
            primary: "#1e1e2f",
            secondary: "#27293d"
        };

        return (
            <ThemeProvider theme={darkTheme}>
                <Container>
                    <PlayersInfoProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </PlayersInfoProvider>
                </Container>
            </ThemeProvider>
        );
    }
}
