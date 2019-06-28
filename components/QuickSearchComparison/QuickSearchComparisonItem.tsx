import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { importTeamLogos } from "../../helpers/image.helper";
import { Player } from "../../models/player";
import { PlayersInfoContext } from "../PlayersProvider";

const teamLogos: { [key: string]: string } = importTeamLogos(
    require.context("../../static", false, /\.(svg)$/)
);

const StyledButton = styled(Button)`
    background: ${props => props.theme.secondary} !important;
    padding: 11px 20px;
    border: none;
    margin: 5px;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 0.35s;

    @keyframes fadeInOpacity {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    &:disabled {
        animation-name: fadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 0.35s;
        @keyframes fadeInOpacity {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 0.65;
            }
        }
    }

    &:hover: enabled {
        outline: none !important;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
        background-color: #27293d !important;
        transform: translateY(-1px);
    }

    &:active: enabled {
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

const ButtonContent = styled.div``;

const TeamIconLeft = styled.img`
    max-height: 55px;
    padding-right: 10px;
`;

const TeamIconRight = styled.img`
    max-height: 55px;
    padding-left: 10px;
`;

const ButtonText = styled.h2`
    font-size: 1rem;
    margin-bottom: 0px;
`;

interface Props {
    onClick: (player: Player[]) => void;
    quickSearchDisabled: boolean;
    players: Player[];
    isLoading: boolean;
}

interface State {}

export default class QuickSearchComparisonItem extends React.Component<
    Props,
    State
> {
    public static contextType = PlayersInfoContext;
    constructor({ props, state }: { props: Props; state: State }) {
        super(props, state);
        this.state = {};
    }

    public getTeamLogo(team: string) {
        return teamLogos[team];
    }

    public render() {
        let quickSearch;
        if (this.props.isLoading) {
            quickSearch = null;
        } else {
            quickSearch = (
                <StyledButton
                    disabled={this.props.quickSearchDisabled}
                    onClick={() => {
                        this.props.onClick(this.props.players);
                    }}>
                    <ButtonContent className="row">
                        <TeamIconLeft
                            src={this.getTeamLogo(
                                this.props.players[0].team.abbreviation
                            )}
                        />
                        <div className="align-self-center">
                            <ButtonText>
                                {`${this.props.players[0].first_name}
                                ${this.props.players[0].last_name}`}
                            </ButtonText>
                            <ButtonText>vs</ButtonText>
                            <ButtonText>
                                {`${this.props.players[1].first_name}
                                ${this.props.players[1].last_name}`}
                            </ButtonText>
                        </div>
                        <TeamIconRight
                            src={this.getTeamLogo(
                                this.props.players[1].team.abbreviation
                            )}
                        />
                    </ButtonContent>
                </StyledButton>
            );
        }
        return quickSearch;
    }
}
