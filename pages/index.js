import Search from '../components/Search.js';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            options: []
        };
    }

    render() {
        return (
            <Search onResultRoute={this.props.onResultRoute}/>
        )
    }
}
