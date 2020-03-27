import React from "react";
import { Button, Row } from "react-bootstrap";
import styled from "styled-components";
import teamLogos from "../../helpers/TeamLogos";
import { Player } from "../../models/player";

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

const QuickSearchComparisonItem = (props: Props) => {
    const { onClick, quickSearchDisabled, players, isLoading } = props;

    if (isLoading) {
        return null;
    }

    return (
        <StyledButton
            disabled={quickSearchDisabled}
            onClick={() => {
                onClick(players);
            }}>
            <Row>
                <TeamIconLeft src={teamLogos[players[0].team.abbreviation]} />
                <div className="align-self-center">
                    <ButtonText>
                        {`${players[0].first_name}
                    ${players[0].last_name}`}
                    </ButtonText>
                    <ButtonText>vs</ButtonText>
                    <ButtonText>
                        {`${players[1].first_name}
                    ${players[1].last_name}`}
                    </ButtonText>
                </div>
                <TeamIconRight src={teamLogos[players[1].team.abbreviation]} />
            </Row>
        </StyledButton>
    );
};

export default QuickSearchComparisonItem;
