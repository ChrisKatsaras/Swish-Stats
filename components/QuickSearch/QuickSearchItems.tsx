import React from "react";
import playersData from "../../data/players";
import { importTeamLogos } from "../../helpers/image.helper";
import { Player } from "../../models/player";
import { PlayersInfoContext } from "../PlayersProvider";
import QuickSearchItem from "./QuickSearchItem";

const teamLogos: { [key: string]: string } = importTeamLogos(
    require.context("../../static", false, /\.(svg)$/)
);

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
        const result = [];

        // Remove players that are already being searched for
        const filteredPlayerData = playersData.filter(
            player => !this.context.playersInfo.includes(player)
        );
        let len = filteredPlayerData.length;
        const taken: number[] = [];

        while (length--) {
            const x = Math.floor(Math.random() * len);
            result[length] = filteredPlayerData[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }

        return result;
    }

    public getTeamLogo(team: string) {
        return teamLogos[team];
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