import fetch from "isomorphic-unfetch";
import { getMainColor } from "nba-color";
import * as React from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import styled from "styled-components";
import { debounce } from "throttle-debounce";
import { importTeamLogos } from "../helpers/image.helper";
import { Player } from "../models/player";
import { PlayersInfoContext } from "./PlayersProvider";

const TeamBadge = styled.div.attrs(props => ({
    style: { background: `${props.bg}` }
}))`
    color: white;
`;

const TeamLogo = styled.img`
    max-height: 50px;
`;

const teamLogos: { [key: string]: string } = importTeamLogos(
    require.context("../static", false, /\.(svg)$/)
);

const filterByCallback = function callback(option: Player, props: any) {
    return (
        props.text.toLowerCase().indexOf(option.first_name.toLowerCase()) !==
            -1 ||
        props.text.toLowerCase().indexOf(props.text.toLowerCase()) !== -1
    );
};

interface Props {
    searchPlayer: (player: Player[]) => void;
}

interface State {
    isLoading: boolean;
    options: Player[];
}

export default class Search extends React.Component<Props, State> {
    public static contextType = PlayersInfoContext;
    public handleSearch = debounce(1000, query => {
        this.setState({ isLoading: true });
        fetch(`https://www.balldontlie.io/api/v1/players?search=${query}`)
            .then(resp => resp.json())
            .then(res => {
                this.setTeamColours(res.data);
                this.setState({
                    isLoading: false
                });
            });
    });
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            isLoading: false,
            options: []
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.setTeamColours = this.setTeamColours.bind(this);
        this.isSearchDisabled = this.isSearchDisabled.bind(this);
    }

    public componentDidMount() {
        this.setState({ isLoading: false });
    }

    public setTeamColours(searchData: Player[]) {
        searchData.forEach(element => {
            element.colour = getMainColor(element.team.abbreviation);
        });

        this.setState({ options: searchData });
    }

    public getTeamLogo(team: string) {
        return teamLogos[team];
    }

    public isSearchDisabled() {
        if (this.context.playersInfo.length >= 4) {
            return true;
        }
        return false;
    }

    public render() {
        return (
            <AsyncTypeahead
                id="Search"
                filterBy={filterByCallback}
                disabled={this.isSearchDisabled()}
                labelKey={(option: Player) =>
                    `${option.first_name} ${option.last_name}`
                }
                isLoading={this.state.isLoading}
                minLength={3}
                onSearch={this.handleSearch}
                onChange={e => this.props.searchPlayer(e)}
                placeholder="Search Player Name"
                options={this.state.options}
                renderMenuItemChildren={option => (
                    <div className="col-xs-*">
                        {option.first_name} {option.last_name}
                        <div>
                            <TeamLogo
                                src={this.getTeamLogo(option.team.abbreviation)}
                            />
                            <TeamBadge className="badge" bg={option.colour.hex}>
                                {option.team.full_name}
                            </TeamBadge>
                        </div>
                    </div>
                )}
            />
        );
    }
}
