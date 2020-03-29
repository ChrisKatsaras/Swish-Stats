import Head from "next/head";
import * as React from "react";
import Header from "./Header";

interface Props {
    children: JSX.Element[] | JSX.Element;
}

const Layout = (props: Props) => (
    <div>
        <Head>
            <title>Swish Stats</title>
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
                key="viewport"
            />
            <link
                href="https://fonts.googleapis.com/css?family=Ubuntu"
                rel="stylesheet"
            />
        </Head>
        <Header />
        {props.children}
    </div>
);
export default Layout;
