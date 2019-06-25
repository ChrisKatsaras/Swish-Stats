import Router from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { PlayersInfoConsumer } from "../components/PlayersProvider";
import Search from "../components/Search";
import players from "../data/players";
import { importTeamLogos } from "../helpers/image.helper";
import { Player } from "../models/player";

const teamLogos: { [key: string]: string } = importTeamLogos(
    require.context("../static", false, /\.(svg)$/)
);

const HomePage = styled.div`
    background: ${props => props.theme.primary};
    height: 100vh;
`;

const H1 = styled.h1`
    font-family: "Ubuntu", sans-serif;
`;

const teamIcon = {
    maxHeight: "55px",
    paddingRight: "10px"
};

const StyledButton = styled(Button)`
    background: #27293d;
    padding: 11px 20px;
    border: none;
    margin: 5px;
    &:hover {
        outline: none !important;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
        background: #27293d;
        transform: translateY(-1px);
    }
    &:active {
        outline: none !important;
        box-shadow: none !important;
        background-color: #27293d !important;
        transform: translateY(1px);
    }
    &:focus {
        outline: none !important;
        box-shadow: !important;
        background: #27293d;
    }
`;

const ButtonContent = styled.div`
    margin-right: 20px;
    margin-left: -10px;
`;

interface Props {}

interface State {}

export default class Index extends React.Component<Props, State> {
    public static contextType = PlayersInfoConsumer;
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            isLoading: false,
            options: []
        };
        this.searchPlayer = this.searchPlayer.bind(this);
    }

    public searchPlayer(players: Player[]) {
        this.context.addPlayerInfo(players[0]);
        Router.push({
            pathname: "/results"
        });
    }

    public onClick(player: Player) {
        this.context.setPlayersInfo(player);

        Router.push({
            pathname: "/results"
        });
    }

    public getTeamLogo(team: string) {
        return teamLogos[team];
    }

    public render() {
        return (
            <HomePage className="position-relative overflow-hidden text-center">
                <div className="col-md-5 mx-auto my-5">
                    <H1 className="display-4 text-light">Swish Stats</H1>
                </div>
                <div className="col-lg-5 container">
                    <Search searchPlayer={this.searchPlayer} />
                </div>
                <div className="col-sm-12 mx-auto my-5 row justify-content-center">
                    {players.map(player => (
                        <StyledButton
                            onClick={() => {
                                this.onClick(player);
                            }}
                            key={player.id}>
                            <ButtonContent className="row">
                                <img
                                    style={teamIcon}
                                    src={this.getTeamLogo(
                                        player.team.abbreviation
                                    )}
                                />
                                <div className="align-self-center">
                                    <h2 style={{ fontSize: "1rem" }}>
                                        {player.first_name +
                                            " " +
                                            player.last_name}
                                    </h2>
                                </div>
                            </ButtonContent>
                        </StyledButton>
                    ))}
                </div>
            </HomePage>
        );
    }
}
