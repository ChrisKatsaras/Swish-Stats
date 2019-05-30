import React from "react";
import Search from "../components/Search";

const masthead = {
    background: "#1e1e2f",
    height: "100vh"
};

const fontPrimary = {
    fontFamily: "'Ubuntu', sans-serif",
    fontWeight: "bold"
} as React.CSSProperties;

interface Props {
    onResultRoute: () => void;
}

interface State {}

export default class Index extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            isLoading: false,
            options: []
        };
    }

    public render() {
        return (
            <div
                style={masthead}
                className="position-relative overflow-hidden text-center">
                <div className="col-md-5 mx-auto my-5">
                    <h1 className="display-4 text-light" style={fontPrimary}>
                        Swish Stats
                    </h1>
                </div>
                <div className="col-lg-5 container">
                    <Search onResultRoute={this.props.onResultRoute} />
                </div>
            </div>
        );
    }
}
