import React, { Component } from "react";
import { Player } from "../models/player";

const PlayersInfoContext = React.createContext({});

class PlayersInfoProvider extends Component {
    public state = {
        playersInfo: []
    };

    public addPlayerInfo = (playerInfo: Player) => {
        this.setState({
            playersInfo: [...this.state.playersInfo, playerInfo]
        });
    };

    public setPlayersInfo = (playerInfo: Player) => {
        this.setState({
            playersInfo: [playerInfo]
        });
    };

    public render() {
        return (
            <PlayersInfoContext.Provider
                value={{
                    addPlayerInfo: this.addPlayerInfo,
                    playersInfo: this.state.playersInfo,
                    setPlayersInfo: this.setPlayersInfo
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
