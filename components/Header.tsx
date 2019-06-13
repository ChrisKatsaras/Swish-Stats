import Link from "next/link";
import * as React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { PlayersInfoContext } from "./PlayersProvider";

const linkStyle = {
    marginRight: 15
};

const navbarBackground = {
    background: "#1e1e2f"
};

const fontPrimary = {
    fontFamily: "'Ubuntu', sans-serif",
    fontWeight: "bold"
} as React.CSSProperties;
export default class Header extends React.Component {
    public static contextType = PlayersInfoContext;

    public render() {
        let resultsLink;
        if (this.context.playersInfo.length > 0) {
            resultsLink = (
                <Link href="/results">
                    <a style={linkStyle}>Results</a>
                </Link>
            );
        } else {
            resultsLink = null;
        }
        return (
            <Navbar style={navbarBackground} className="navbar" variant="dark">
                <Navbar.Brand style={fontPrimary}>Swish Stats</Navbar.Brand>
                <Nav className="mr-auto">
                    <Link href="/">
                        <a style={linkStyle}>Home</a>
                    </Link>
                    {resultsLink}
                </Nav>
            </Navbar>
        );
    }
}
