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
    &&& {
        background: ${props => props.theme.secondary};
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
            outline: none;
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
            background-color: #27293d;
            transform: translateY(-1px);
        }

        &:active: enabled {
            outline: none;
            box-shadow: none;
            background-color: #27293d;
            transform: translateY(1px);
        }

        &:focus {
            outline: none;
            box-shadow: none;
            background: #27293d;
        }
    }
`;

const ButtonContent = styled.div`
    margin-right: 5px;
    margin-left: -10px;
`;

const TeamIcon = styled.img`
    max-height: 55px;
    padding-right: 10px;
`;

const ButtonText = styled.h2`
    font-size: 1rem;
    margin-bottom: 0px;
`;

interface Props {
    onClick: (player: Player) => void;
    player: Player;
    isLoading: boolean;
}

export default class QuickSearchItem extends React.Component<Props, {}> {
    public static contextType = PlayersInfoContext;
    constructor({ props, state }: { props: Props; state: {} }) {
        super(props, state);
        this.state = {};
        this.isQuickSearchDisabled = this.isQuickSearchDisabled.bind(this);
    }

    public getTeamLogo(team: string) {
        return teamLogos[team];
    }

    public isQuickSearchDisabled(): boolean {
        if (this.context.playersInfo.length >= 10) {
            return true;
        }
        return false;
    }

    public render() {
        let quickSearch;
        if (this.props.isLoading) {
            quickSearch = null;
        } else {
            quickSearch = (
                <StyledButton
                    disabled={this.isQuickSearchDisabled()}
                    onClick={() => {
                        this.props.onClick(this.props.player);
                    }}
                    key={this.props.player.id}>
                    <ButtonContent className="row">
                        <TeamIcon
                            src={this.getTeamLogo(
                                this.props.player.team.abbreviation
                            )}
                        />
                        <div className="align-self-center">
                            <ButtonText>
                                {`${this.props.player.first_name}
                                ${this.props.player.last_name}`}
                            </ButtonText>
                        </div>
                    </ButtonContent>
                </StyledButton>
            );
        }
        return quickSearch;
    }
}
