import React, { Component } from "react";
import { Player } from "../models/player";

const PlayersInfoContext = React.createContext({});

class PlayersInfoProvider extends Component {
    public state = {
        playersInfo: []
    };

    public addPlayerInfo = (playerInfo: Player) => {
        if (this.state.playersInfo.find(p => p.id === playerInfo.id) == null) {
            this.setState({
                playersInfo: [...this.state.playersInfo, playerInfo]
            });
        }
    };

    public setPlayersInfo = (playerInfo: Player) => {
        this.setState({
            playersInfo: [playerInfo]
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
