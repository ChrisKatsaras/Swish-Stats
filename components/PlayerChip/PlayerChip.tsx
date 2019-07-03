import React from "react";
import { Badge, Button, Row } from "react-bootstrap";
import XIcon from "react-feather/dist/icons/x";
import styled from "styled-components";
import { importTeamLogos } from "../../helpers/image.helper";
import { Player } from "../../models/player";
import { PlayersInfoContext } from "../PlayersProvider";

const teamLogos: { [key: string]: string } = importTeamLogos(
    require.context("../../static", false, /\.(svg)$/)
);

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

const RemoveIcon = styled(XIcon)``;

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
    onClick: (player: Player) => void;
}

interface State {}

export default class PlayerChip extends React.Component<Props, State> {
    public static contextType = PlayersInfoContext;
    constructor({ props, state }: { props: Props; state: State }) {
        super(props, state);
        this.state = {};
    }

    public getTeamLogo(team: string) {
        return teamLogos[team];
    }

    public render() {
        return (
            <PlayerBadge
                pill
                onClick={() => {
                    this.props.onClick(this.props.player.id);
                }}>
                <Row>
                    <TeamIcon
                        src={this.getTeamLogo(
                            this.props.player.team.abbreviation
                        )}
                    />
                    <BadgeText className="align-self-center">
                        {`${this.props.player.first_name}
                         ${this.props.player.last_name}`}
                    </BadgeText>
                    <RemoveIcon className="align-self-center" color="white" />
                </Row>
            </PlayerBadge>
        );
    }
}
