import fetch from "isomorphic-unfetch";
import { getMainColor } from "nba-color";
import * as React from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import styled from "styled-components";
import { debounce } from "throttle-debounce";
import teamLogos from "../helpers/TeamLogos";
import { Player } from "../models/player";
import { PlayersInfoContext } from "./PlayersProvider";

// Workaround for custom attribute
declare module "react" {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        background?: string;
    }
}

const StyledSearch = styled(AsyncTypeahead)`
    &&& {
        border-radius: 30px;
        min-width: 275px;
        > .form-control: {
            border-radius: 30px;
        }
        > .rbt-input-main: {
            border-radius: 30px;
        }

        &:nth-child(1) {
            > :nth-child(1) {
                > :nth-child(1) {
                    border-radius: 20px;
                }
            }
        }
    }
`;

interface TeamBadgeProps {
    background: string;
}
const TeamBadge = styled.div.attrs<TeamBadgeProps>(props => ({
    style: { background: props.background }
}))`
    color: white;
`;

const TeamLogo = styled.img`
    max-height: 50px;
`;

const filterByCallback = function callback(
    option: Player,
    props: any
): boolean {
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
    public handleSearch = debounce(1, query => {
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
            element.teamColor = getMainColor(element.team.abbreviation).hex;
        });

        this.setState({ options: searchData });
    }

    public isSearchDisabled() {
        if (this.context.playersInfo.length >= 10) {
            return true;
        }
        return false;
    }

    public render() {
        const { searchPlayer } = this.props;

        return (
            <div>
                {/*
                // @ts-ignore */}
                <StyledSearch
                    id="Search"
                    filterBy={filterByCallback}
                    disabled={this.isSearchDisabled()}
                    labelKey={(option: Player) =>
                        `${option.first_name} ${option.last_name}`
                    }
                    isLoading={this.state.isLoading}
                    minLength={3}
                    onSearch={this.handleSearch}
                    onChange={(e: any) => searchPlayer(e)}
                    placeholder="Search Player Name"
                    options={this.state.options}
                    renderMenuItemChildren={(option: Player) => (
                        <div className="col-xs-*">
                            {option.first_name} {option.last_name}
                            <div>
                                <TeamLogo
                                    src={teamLogos[option.team.abbreviation]}
                                />
                                {/*
                                    // @ts-ignore */}
                                <TeamBadge
                                    background={option.teamColor}
                                    className="badge">
                                    {option.team.full_name}
                                </TeamBadge>
                            </div>
                        </div>
                    )}
                    style={{ borderRadius: "30px" }}
                />
            </div>
        );
    }
}
