import Search from '../components/Search';
import React from 'react';

type Props = {
    onResultRoute: () => void;
};

type State = {};

export default class Index extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            isLoading: false,
            options: []
        };
    }

    render() {
        return (
            <Search onResultRoute={this.props.onResultRoute}/>
        );
    }
}
