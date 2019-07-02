import React from "react";
import { Modal, Table } from "react-bootstrap";
import XIcon from "react-feather/dist/icons/x";
import styled from "styled-components";
import { importTeamLogos } from "../helpers/image.helper";
import { Player } from "../models/player";
import { PlayersInfoContext } from "./PlayersProvider";
import QuickSearchItems from "./QuickSearch/QuickSearchItems";
import Search from "./Search";
import WarningAlert from "./WarningAlert";

const playerLimit = 4;

const teamLogos: { [key: string]: string } = importTeamLogos(
    require.context("../static", false, /\.(svg)$/)
);

interface Props {}

interface State {
    showPlayerModal: boolean;
}

const ModalBody = styled(Modal.Body)`
    background: ${props => props.theme.primary};
`;

const PlayerTable = styled(Table)`
    background: transparent;
`;

const TeamLogo = styled.img`
    max-height: 50px;
`;

const TableItem = styled.td`
    &&& {
        vertical-align: middle;
    }
`;

export default class PlayerModal extends React.Component<Props, State> {
    public static contextType = PlayersInfoContext;
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            showPlayerModal: false
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.searchPlayer = this.searchPlayer.bind(this);
        this.quickSearchPlayer = this.quickSearchPlayer.bind(this);
    }

    public getTeamLogo(team: string) {
        return teamLogos[team];
    }

    public showModal() {
        this.setState({ showPlayerModal: true });
    }

    public hideModal() {
        this.setState({ showPlayerModal: false });
    }

    public searchPlayer(players: Player[]) {
        if (players.length > 0) {
            this.context.addPlayerInfo(players);
            this.hideModal();
        }
    }

    public quickSearchPlayer(player: Player) {
        this.context.addPlayerInfo([player]);
        this.hideModal();
    }

    public removePlayer = (playerId: number) => {
        if (playerId != null) {
            this.context.removePlayerInfo(playerId);
        }
    };

    public render() {
        let limitWarning = null;
        if (this.context.playersInfo.length >= 4) {
            limitWarning = (
                <div className="row justify-content-center">
                    <WarningAlert
                        text={`Cannot search for more than ${playerLimit} players`}
                    />
                </div>
            );
        }

        return (
            <Modal show={this.state.showPlayerModal} onHide={this.hideModal}>
                <ModalBody>
                    <div className="position-relative overflow-hidden text-center">
                        {limitWarning}
                    </div>
                    <h5 className="text-light">Players</h5>
                    <Search searchPlayer={this.searchPlayer} />
                    <div className="justify-content-center">
                        <QuickSearchItems
                            onClick={this.quickSearchPlayer}
                            numberOfItems={2}
                        />
                    </div>
                    <PlayerTable borderless variant="dark">
                        <thead>
                            <tr>
                                <th />
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {this.context.playersInfo.map((player: Player) => {
                                return (
                                    <tr key={player.id}>
                                        <td>
                                            <TeamLogo
                                                src={this.getTeamLogo(
                                                    player.team.abbreviation
                                                )}
                                            />
                                        </td>
                                        <TableItem>
                                            {player.first_name}
                                        </TableItem>
                                        <TableItem>
                                            {player.last_name}
                                        </TableItem>
                                        <TableItem>
                                            <XIcon
                                                onClick={() => {
                                                    this.removePlayer(
                                                        player.id
                                                    );
                                                }}
                                            />
                                        </TableItem>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </PlayerTable>
                </ModalBody>
            </Modal>
        );
    }
}
