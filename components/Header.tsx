import Link from "next/link";
import styled from "styled-components";

import Router, { withRouter } from "next/router";
import * as React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Player } from "../models/player";
import { PlayersInfoContext } from "./PlayersProvider";
import Search from "./Search";

const HeaderLink = styled.a`
    margin-right: 15px;
`;

const StyledHeader = styled(Navbar)`
    background: ${props => props.theme.primary};
`;

const BrandLink = styled.a`
    font-family: Ubuntu, sans-serif;
    color: white;

    &:hover {
        color: white;
        text-decoration: none;
    }
`;

class Header extends React.Component {
    public static contextType = PlayersInfoContext;
    constructor() {
        super();
        this.searchPlayer = this.searchPlayer.bind(this);
    }

    public searchPlayer(players: Player[]) {
        this.context.addPlayerInfo(players);
    }

    public render() {
        let resultsLink = null;
        let searchBar = null;

        if (this.context.playersInfo.length > 0) {
            resultsLink = (
                <Link href="/results" passHref>
                    <HeaderLink>Results</HeaderLink>
                </Link>
            );
        }

        if (this.props.router.route != "/") {
            searchBar = <Search searchPlayer={this.searchPlayer} />;
        }

        return (
            <StyledHeader className="navbar" variant="dark">
                <Navbar.Brand>
                    <Link href="/" passHref>
                        <BrandLink>Swish Stats</BrandLink>
                    </Link>
                </Navbar.Brand>
                <Nav className="mr-auto">{resultsLink}</Nav>
                <Nav.Item className="jutify-content-end fill mr-sm-2">
                    <div className="input-group">{searchBar}</div>
                </Nav.Item>
            </StyledHeader>
        );
    }
}

export default withRouter(Header);
