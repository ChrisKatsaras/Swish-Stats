import React from "react";
import playersData from "../../data/players";
import { Player } from "../../models/player";
import { PlayersInfoContext } from "../PlayersProvider";
import QuickSearchItem from "./QuickSearchItem";

interface Props {
    onClick: (player: Player) => void;
    numberOfItems: number;
}

interface State {
    players: Player[];
    isLoading: boolean;
}

export default class QuickSearchItems extends React.Component<Props, State> {
    public static contextType = PlayersInfoContext;
    constructor({ props, state }: { props: Props; state: State }) {
        super(props, state);
        this.state = {
            players: [],
            isLoading: true
        };
        this.getRandomPlayerList = this.getRandomPlayerList.bind(this);
    }

    public componentDidMount() {
        this.setState({
            players: this.getRandomPlayerList(this.props.numberOfItems)
        });

        this.setState({
            isLoading: false
        });
    }

    public getRandomPlayerList(length: number): Player[] {
        const playerList = [];
        let remainingItems = length;
        // Remove players that are already being searched for
        const filteredPlayerData = playersData.filter(
            player => !this.context.playersInfo.includes(player)
        );
        let playerDataLength = filteredPlayerData.length;
        const taken: number[] = [];

        while (remainingItems > 0) {
            const x = Math.floor(Math.random() * playerDataLength);
            playerList[remainingItems] =
                filteredPlayerData[x in taken ? taken[x] : x];
            taken[x] =
                --playerDataLength in taken
                    ? taken[playerDataLength]
                    : playerDataLength;
            remainingItems -= 1;
        }

        return playerList;
    }

    public render() {
        let quickSearch;
        if (this.state.isLoading) {
            quickSearch = null;
        } else {
            quickSearch = this.state.players.map(player => (
                <QuickSearchItem
                    key={player.id}
                    player={player}
                    isLoading={this.state.isLoading}
                    onClick={() => {
                        this.props.onClick(player);
                    }}
                />
            ));
        }
        return quickSearch;
    }
}
