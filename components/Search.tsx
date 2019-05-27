import fetch from "isomorphic-unfetch";
import { getMainColor } from "nba-color";
import Router from "next/router";
import * as React from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { debounce } from "throttle-debounce";
import { importTeamLogos } from "../helpers/image.helper";
import { Player } from "../models/player";

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
    onResultRoute: (option: Player) => void;
}

interface State {
    isLoading: boolean;
    options: Player[];
}

export default class Search extends React.Component<Props, State> {
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
        this.routeToResults = this.routeToResults.bind(this);
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

    public routeToResults(e: Player[]) {
        this.props.onResultRoute(e[0]);
        Router.push({
            pathname: "/results"
        });
    }

    public render() {
        return (
            <AsyncTypeahead
                id="Search"
                filterBy={filterByCallback}
                labelKey={(option: Player) =>
                    `${option.first_name} ${option.last_name}`
                }
                isLoading={this.state.isLoading}
                minLength={3}
                onSearch={this.handleSearch}
                onChange={e => this.routeToResults(e)}
                placeholder="Search Player Name"
                className="col-md-5 p-lg-5 mx-auto my-5"
                options={this.state.options}
                renderMenuItemChildren={option => (
                    <div className="col-xs-*">
                        {option.first_name} {option.last_name}
                        <div>
                            <img
                                style={{ maxHeight: "50px" }}
                                src={this.getTeamLogo(option.team.abbreviation)}
                            />
                            <span
                                className="badge"
                                style={{
                                    backgroundColor: option.colour.hex,
                                    color: "white"
                                }}>
                                {option.team.full_name}
                            </span>
                        </div>
                    </div>
                )}
            />
        );
    }
}
