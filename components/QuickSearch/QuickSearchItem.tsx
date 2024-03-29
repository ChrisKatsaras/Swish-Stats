import React, { useContext } from "react";
import { Button, Row } from "react-bootstrap";
import styled from "styled-components";
import teamLogos from "../../helpers/TeamLogos";
import { Player } from "../../models/player";
import { PlayersInfoContext } from "../PlayersProvider";

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

const ButtonContent = styled(Row)`
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

const QuickSearchItem = (props: Props) => {
    const { onClick, player, isLoading } = props;

    const playerContext = useContext(PlayersInfoContext);

    if (isLoading) {
        return null;
    }

    return (
        <StyledButton
            disabled={playerContext.playersInfo.length >= 10}
            onClick={() => onClick(player)}
            key={player.id}>
            <ButtonContent>
                <TeamIcon src={teamLogos[player.team.abbreviation]} />
                <div className="align-self-center">
                    <ButtonText>
                        {`${player.first_name}
                                ${player.last_name}`}
                    </ButtonText>
                </div>
            </ButtonContent>
        </StyledButton>
    );
};

export default QuickSearchItem;
