import React from 'react';
import { calculateSeasonTotals } from "../helpers/stat.helper";
import { Player } from '../models/player';

const masthead = {
    background: 'linear-gradient(#16222A, #343a44)',
    height: '100vh'
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
    playerInfo: Player | null;
};

type State = {
    playerSeasonTotals: any;
};
export default class Results extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            playerSeasonTotals: null
        };
    }

    componentDidMount() {
        if (this.props.playerInfo != null) {
            calculateSeasonTotals(this.props.playerInfo.id)
            .then((res) => {
                this.setState({ playerSeasonTotals:res });
            });
        }
    }
    render() {
        if (!this.state.playerSeasonTotals) {
            return (
                <div style={masthead} className="position-relative overflow-hidden text-light text-center">
                    <div style={loader} className="spinner-grow col-md-5 p-lg-5 mx-auto my-5" role="status" />
                </div>
            );

        }

        return (
            <div style={masthead} className="position-relative overflow-hidden text-center">
                <div className="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 className="display-4 text-light" style={fontPrimary}>Results</h1>
                    <h3 className="text-light">Points</h3>
                    <h2 className="display-4 text-light">{this.state.playerSeasonTotals.totalPoints}</h2>
                </div>
                <div className="product-device shadow-sm d-none d-md-block"></div>
                <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
            </div>
        );
    }
}
