import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import { debounce } from 'throttle-debounce';

const masthead = {
    background: 'linear-gradient(#16222A, #343a44)',
    height: '100vh'
}

const fontPrimary = {
    fontFamily: `'Ubuntu', sans-serif`,
    fontWeight: 'bold'
}

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            options: []
          };
        this._handleSearch = this._handleSearch.bind(this);
    }
    
    componentDidMount() {
        this.setState({isLoading:false})
    }

    _handleSearch = debounce(1000, function(query) {
        console.log(query)
        this.setState({isLoading: true});
        fetch(`https://www.balldontlie.io/api/v1/players?search=${query}`)
        .then(resp => resp.json())
        .then(json => this.setState({
            isLoading: false,
            options: json.data,
        }));
    });

    render() {
        const filterByFields = ['first_name', 'last_name'];
        return (
            <Layout>
                <div style={masthead} className="position-relative overflow-hidden text-center">
                    <div className="col-md-5 p-lg-5 mx-auto my-5">
                        <h1 className="display-4 text-light" style={fontPrimary}>Swish Stats</h1>
                    </div>

                    <AsyncTypeahead
                        id="Search"

                        {...this.state}
                        filterBy={ filterByFields}
                        labelKey={(option) => `${option.first_name}`}
                        isLoading={this.state.isLoading}
                        minLength={3}
                        name="CompanyId"
                        onSearch={this._handleSearch}
                        placeholder="Search Player Name"
                        className="col-md-5 p-lg-5 mx-auto my-5"
                        options={this.state.options}
                        renderMenuItemChildren={(option) => (
                            <div>
                                {option.first_name} {option.last_name}
                                <div>
                                    <small>Team: {option.team.full_name}</small>
                                </div>
                            </div>
                        )}
                    />

                    <div className="product-device shadow-sm d-none d-md-block"></div>
                    <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
                </div>
            </Layout>
        )
    }
}