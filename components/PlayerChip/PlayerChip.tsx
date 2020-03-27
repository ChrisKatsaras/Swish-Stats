import React from "react";
import { Badge, Row } from "react-bootstrap";
import { X } from "react-feather";
import styled from "styled-components";
import teamLogos from "../../helpers/TeamLogos";
import { Player } from "../../models/player";

const TeamIcon = styled.img`
    max-height: 30px;
`;

const BadgeText = styled.h6`
    font-size: 1rem;
    margin-bottom: 0px;
    color: white;
    margin-right: 5px;
    margin-left: 5px;
`;

const RemoveIcon = styled(X)``;

const PlayerBadge = styled(Badge)`
    background: ${props => props.theme.secondary};
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin: 5px;
    cursor: pointer;
    &:hover ${RemoveIcon} {
        stroke: #fd5d93 !important;
        transition: stroke 0.2s ease-in-out;
    }
`;
interface Props {
    player: Player;
    onClick: (player: number) => void;
}

const PlayerChip = (props: Props) => {
    const { player, onClick } = props;
    return (
        <PlayerBadge
            pill
            onClick={() => {
                onClick(player.id);
            }}>
            <Row>
                <TeamIcon src={teamLogos[player.team.abbreviation]} />
                <BadgeText className="align-self-center">
                    {`${player.first_name}
                         ${player.last_name}`}
                </BadgeText>
                <RemoveIcon className="align-self-center" color="white" />
            </Row>
        </PlayerBadge>
    );
};

export default PlayerChip;
