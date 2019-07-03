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
    min-height: 62px;
`;

const BrandLink = styled.a`
    font-family: Ubuntu, sans-serif;
    color: white;
    font-size: 1.4rem;

    &:hover {
        color: white;
        text-decoration: none;
    }
`;

const StyledToggle = styled(Navbar.Toggle)`
    &:active {
        outline: none;
        box-shadow: none;
    }
    &:focus {
        outline: none;
        box-shadow: none;
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
        let searchBar = null;

        if (this.props.router.route !== "/") {
            searchBar = (
                <React.Fragment>
                    <StyledToggle />
                    <Navbar.Collapse
                        className="justify-content-end"
                        id="basic-navbar-nav">
                        <Nav.Item className="justify-content-end fill my-1 mr-sm-2">
                            <div className="input-group">
                                <Search searchPlayer={this.searchPlayer} />
                            </div>
                        </Nav.Item>
                    </Navbar.Collapse>
                </React.Fragment>
            );
        }

        return (
            <StyledHeader className="navbar" variant="dark" expand="sm">
                <Navbar.Brand>
                    <Link href="/" passHref>
                        <BrandLink>Swish Stats</BrandLink>
                    </Link>
                </Navbar.Brand>
                <Nav.Item className="mr-auto">
                    {this.context.playersInfo.length > 0 && (
                        <Link href="/results" passHref>
                            <HeaderLink>Results</HeaderLink>
                        </Link>
                    )}
                </Nav.Item>
                {searchBar}
            </StyledHeader>
        );
    }
}

export default withRouter(Header);
