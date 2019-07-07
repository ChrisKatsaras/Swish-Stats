import Link from "next/link";
import { SingletonRouter, withRouter } from "next/router";
import * as React from "react";
import { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styled from "styled-components";
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

interface Props {
    router: SingletonRouter;
}

const Header = (props: Props) => {
    const playerContext = useContext(PlayersInfoContext);

    const searchPlayer = (players: Player[]) => {
        playerContext.addPlayerInfo(players);
    };

    return (
        <StyledHeader className="navbar" variant="dark" expand="sm">
            <Navbar.Brand>
                <Link href="/" passHref>
                    <BrandLink>Swish Stats</BrandLink>
                </Link>
            </Navbar.Brand>
            <Nav.Item className="mr-auto">
                {playerContext.playersInfo.length > 0 && (
                    <Link href="/results" passHref>
                        <HeaderLink>Results</HeaderLink>
                    </Link>
                )}
            </Nav.Item>
            {props.router.route !== "/" && (
                <React.Fragment>
                    <StyledToggle />
                    <Navbar.Collapse
                        className="justify-content-end"
                        id="basic-navbar-nav">
                        <Nav.Item className="justify-content-end fill my-1 mr-sm-2">
                            <div className="input-group">
                                <Search searchPlayer={searchPlayer} />
                            </div>
                        </Nav.Item>
                    </Navbar.Collapse>
                </React.Fragment>
            )}
        </StyledHeader>
    );
};

export default withRouter(Header);
