import Link from "next/link";
import styled from "styled-components";

import * as React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { PlayersInfoContext } from "./PlayersProvider";

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

export default class Header extends React.Component {
    public static contextType = PlayersInfoContext;

    public render() {
        let resultsLink;
        if (this.context.playersInfo.length > 0) {
            resultsLink = (
                <Link href="/results" passHref>
                    <HeaderLink>Results</HeaderLink>
                </Link>
            );
        } else {
            resultsLink = null;
        }
        return (
            <StyledHeader className="navbar" variant="dark">
                <Navbar.Brand>
                    <Link href="/" passHref>
                        <BrandLink>Swish Stats</BrandLink>
                    </Link>
                </Navbar.Brand>
                <Nav className="mr-auto">{resultsLink}</Nav>
            </StyledHeader>
        );
    }
}
