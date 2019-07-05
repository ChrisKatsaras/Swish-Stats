import React from "react";
import playersData from "../../data/players";
import { Player } from "../../models/player";
import { PlayersInfoContext } from "../PlayersProvider";
import QuickSearchComparisonItem from "./QuickSearchComparisonItem";

interface Props {
    onClick: (player: Player[]) => void;
    numberOfItems: number;
}

interface State {
    players: Player[][];
    isLoading: boolean;
}

export default class QuickSearchComparisonItems extends React.Component<
    Props,
    State
> {
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

    public getRandomPlayerList(length: number): Player[][] {
        const result: Player[][] = [];

        // Remove players that are already being searched for
        const filteredPlayerData = playersData.filter(
            player => !this.context.playersInfo.includes(player)
        );
        let len = filteredPlayerData.length;
        const taken: number[] = [];

        while (length--) {
            result[length] = [];

            // First player
            let x = Math.floor(Math.random() * len);
            result[length].push(filteredPlayerData[x in taken ? taken[x] : x]);
            taken[x] = --len in taken ? taken[len] : len;

            // Second player
            x = Math.floor(Math.random() * len);
            result[length].push(filteredPlayerData[x in taken ? taken[x] : x]);
            taken[x] = --len in taken ? taken[len] : len;
        }

        return result;
    }

    public render() {
        let quickSearch;
        if (this.state.isLoading) {
            quickSearch = null;
        } else {
            quickSearch = this.state.players.map((player, index) => (
                <QuickSearchComparisonItem
                    key={index}
                    players={player}
                    quickSearchDisabled={false}
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
