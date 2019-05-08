import React from 'react';

const statCard = {
    background: '#27293d',
    marginBottom: '30px',
    fontSize: '1.4375rem',
    border: 0,
};

const statCardFooter = {
    background: '#27293d',
    border: 0,
    color: 'white'
};

type Props = {
    footerText: string,
    statistic: number
};

type State = {};

export default class Index extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
    }

    render() {
        return (
            <div className="col-lg-3 col-md-6">
                <div className="card" style={statCard}>
                    <div className="card-body">
                        <h3 className="display-4 text-light">{this.props.statistic}</h3>
                    </div>
                    <div className="card-footer" style={statCardFooter}>
                        <hr/>
                        {this.props.footerText}
                    </div>
                </div>
            </div>
        );
    }
}
