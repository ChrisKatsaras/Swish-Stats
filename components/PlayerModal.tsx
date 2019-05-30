import React from "react";
import { Modal, Table } from "react-bootstrap";
import XIcon from "react-feather/dist/icons/x";
import { importTeamLogos } from "../helpers/image.helper";
import { Player } from "../models/player";
import { PlayersInfoConsumer } from "./PlayersProvider";
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
    maxHeight: "30px"
};

const gridText = {
    verticalAlign: "middle"
};

const playerTable = {
    background: "transparent"
};

export default class PlayerModal extends React.Component<Props, State> {
    public static contextType = PlayersInfoConsumer;
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            showPlayerModal: false
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
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

    public render() {
        console.log(this.context.playersInfo);
        return (
            <Modal show={this.state.showPlayerModal} onHide={this.hideModal}>
                <Modal.Body style={modal}>
                    <h5 className="text-light">Players</h5>
                    <Search />
                    <Table style={playerTable} borderless hover variant="dark">
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
                                    <tr>
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
                                            <XIcon />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    ;
                </Modal.Body>
            </Modal>
        );
    }
}
