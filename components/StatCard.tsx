import React from "react";

const statCard = {
    background: "#27293d",
    marginBottom: "30px",
    fontSize: "1.4375rem",
    border: 0
};

const statCardBody = {
    paddingBottom: "0px"
};

const statCardFooter = {
    background: "#27293d",
    border: 0,
    color: "white"
};

const teamIcon = {
    maxHeight: "65px",
    marginLeft: "-15px",
    marginTop: "-15px"
};

const cardInfoSection = {
    textAlign: "left"
} as React.CSSProperties;

const cardStatisticSection = {
    textAlign: "right"
} as React.CSSProperties;

const cardCategory = {
    fontSize: "0.8rem",
    marginBottom: "0px",
    marginTop: "-10px"
};

const cardDate = {
    fontSize: "0.75rem",
    marginBottom: "30px",
    marginTop: "0px"
};

const divder = {
    borderColor: "#525F7F"
};

interface Props {
    footerText: string;
    statistic: number;
    playerName: string;
    logo: string;
    categoryAbbreviation: string;
}

interface State {}

export default class Index extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
    }

    public render() {
        return (
            <div className="col-lg-4 col-md-6">
                <div className="card" style={statCard}>
                    <div className="card-body" style={statCardBody}>
                        <div className="row">
                            <div
                                className="col-8 text-light"
                                style={cardInfoSection}>
                                <div className="column">
                                    <img
                                        style={teamIcon}
                                        src={this.props.logo}
                                    />
                                    <h2 style={{ fontSize: "1.2rem" }}>
                                        {this.props.playerName}
                                    </h2>
                                </div>
                            </div>
                            <div className="col-4" style={cardStatisticSection}>
                                <div className="column">
                                    <p className="text-light" style={cardDate}>
                                        2018/ 2019
                                    </p>
                                    <h3 className="h3 text-light">
                                        {this.props.statistic}
                                    </h3>
                                    <p
                                        className="text-light"
                                        style={cardCategory}>
                                        {this.props.categoryAbbreviation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer" style={statCardFooter}>
                        <hr style={divder} />
                        {this.props.footerText}
                    </div>
                </div>
            </div>
        );
    }
}
