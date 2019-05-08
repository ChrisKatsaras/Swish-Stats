import React from 'react';
import { calculateSeasonTotals, getPlayersSeasonTotal } from "../helpers/stat.helper";
import { Player } from '../models/player';
import { importTeamLogos } from '../helpers/image.helper';
import StatCard from '../components/StatCard';

const teamLogos: {[key: string]: string} = importTeamLogos(require.context('../static', false, /\.(svg)$/));

const masthead = {
    background: '#1e1e2f',
    height: '100vh',
    paddingLeft: '30px',
    paddingRight: '30px'
};

const loader = {
    position: 'fixed',
    zindex: '999',
    height: '2em',
    width: '2em',
    overflow: 'visible',
    margin: 'auto',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0'
} as React.CSSProperties;

const fontPrimary = {
    fontFamily: "'Ubuntu', sans-serif`",
    fontWeight: 'bold'
} as React.CSSProperties;

type Props = {
    playerInfo: Player;
};

type State = {
    playerSeasonTotals: any;
    playerSeasonAverages: any;
};

export default class Results extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            playerSeasonTotals: null,
            playerSeasonAverages: null
        };
    }

    componentDidMount() {
        if (this.props.playerInfo != null) {
            calculateSeasonTotals(this.props.playerInfo.id)
            .then((res) => {
                this.setState({ playerSeasonTotals: res });
            });

            getPlayersSeasonTotal(2018, this.props.playerInfo.id)
            .then((res) => {
                this.setState({ playerSeasonAverages: res[0] });
            });
        }
    }

    getTeamLogo(team: string) {
        return teamLogos[team];
    }

    render() {
        if (!this.state.playerSeasonTotals) {
            return (
                <div style={masthead} className="position-relative overflow-hidden text-light text-center">
                    <div style={loader} className="spinner-grow col-md-5 p-lg-5 mx-auto my-5" role="status" />
                </div>
            );

        }

        if (!this.state.playerSeasonAverages) {
            return (
                <div style={masthead} className="position-relative overflow-hidden text-light text-center">
                   <h1 className="col-md-5 p-lg-5 mx-auto my-5">No 2018 data found for this player</h1>
                </div>
            );
        }

        return (
            <div style={masthead} className="position-relative overflow-hidden text-center">
                <div className="mx-auto my-5">
                    <h1 className="display-4 text-light" style={fontPrimary}>
                        <img style={{ maxHeight: '100px' }} src={this.getTeamLogo(this.props.playerInfo.team.abbreviation)}></img>
                        { this.props.playerInfo.first_name } { this.props.playerInfo.last_name }
                    </h1>
                    <div className="row">
                        <StatCard footerText="Points Per Game" statistic={this.state.playerSeasonAverages.pts}/>
                        <StatCard footerText="Rebounds Per Game" statistic={this.state.playerSeasonAverages.reb}/>
                        <StatCard footerText="Assists Per Game" statistic={this.state.playerSeasonAverages.ast}/>
                        <StatCard footerText="Steals Per Game" statistic={this.state.playerSeasonAverages.stl}/>
                    </div>
                </div>
                <div className="product-device shadow-sm d-none d-md-block"></div>
                <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
            </div>
        );
    }
}
