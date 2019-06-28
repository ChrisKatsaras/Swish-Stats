import React, { Component } from "react";
import { Player } from "../models/player";

const PlayersInfoContext = React.createContext({});

interface State {
    playersInfo: Player[];
}

class PlayersInfoProvider extends Component<State> {
    constructor(state: State) {
        super(state);

        this.state = {
            playersInfo: []
        };
    }

    public addPlayerInfo = (playerInfo: Player[]) => {
        const playersToAdd: Player[] = [];
        playerInfo.map(player => {
            if (this.state.playersInfo.find(p => p.id === player.id) == null) {
                playersToAdd.push(player);
            }
        });
        this.setState({
            playersInfo: [...this.state.playersInfo, ...playersToAdd]
        });
    };

    public setPlayersInfo = (playerInfo: Player[]) => {
        this.setState({
            playersInfo: [...playerInfo]
        });
    };

    public removePlayerInfo = (playerId: number) => {
        this.setState({
            playersInfo: this.state.playersInfo.filter((player: Player) => {
                return player.id !== playerId;
            })
        });
    };

    public render() {
        return (
            <PlayersInfoContext.Provider
                value={{
                    addPlayerInfo: this.addPlayerInfo,
                    playersInfo: this.state.playersInfo,
                    setPlayersInfo: this.setPlayersInfo,
                    removePlayerInfo: this.removePlayerInfo
                }}>
                {this.props.children}
            </PlayersInfoContext.Provider>
        );
    }
}

const PlayersInfoConsumer = PlayersInfoContext.Consumer;

export default PlayersInfoProvider;
export { PlayersInfoConsumer };
export { PlayersInfoContext };
