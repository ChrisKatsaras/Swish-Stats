import React from "react";
import { Button, Modal, Table } from "react-bootstrap";
import XIcon from "react-feather/dist/icons/x";
import { importTeamLogos } from "../helpers/image.helper";
import { Player } from "../models/player";
import { PlayersInfoContext } from "./PlayersProvider";
import Search from "./Search";

const teamLogos: { [key: string]: string } = importTeamLogos(
    require.context("../static", false, /\.(svg)$/)
);

interface Props {}

interface State {
    showPlayerModal: boolean;
}

const modal = {
    background: "rgb(30, 30, 47)"
};

const teamIcon = {
    maxHeight: "50px"
};

const gridText = {
    verticalAlign: "middle"
};

const playerTable = {
    background: "transparent"
};

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
            this.context.addPlayerInfo(players[0]);
            this.hideModal();
        }
    }

    public removePlayer = (playerId: number) => {
        if (playerId != null) {
            this.context.removePlayerInfo(playerId);
        }
    };

    public render() {
        return (
            <Modal show={this.state.showPlayerModal} onHide={this.hideModal}>
                <Modal.Body style={modal}>
                    <h5 className="text-light">Players</h5>
                    <Search searchPlayer={this.searchPlayer} />
                    <Table style={playerTable} borderless variant="dark">
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
                                            <img
                                                style={teamIcon}
                                                src={this.getTeamLogo(
                                                    player.team.abbreviation
                                                )}
                                            />
                                        </td>
                                        <td style={gridText}>
                                            {player.first_name}
                                        </td>
                                        <td style={gridText}>
                                            {player.last_name}
                                        </td>
                                        <td style={gridText}>
                                            <XIcon
                                                onClick={() => {
                                                    this.removePlayer(
                                                        player.id
                                                    );
                                                }}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        );
    }
}
