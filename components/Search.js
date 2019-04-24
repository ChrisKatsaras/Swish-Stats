import fetch from 'isomorphic-unfetch'
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import { debounce } from 'throttle-debounce';
import { getMainColor } from 'nba-color';
import Router from 'next/router'
import { importTeamLogos } from '../helpers/image.helper'

const teamLogos = importTeamLogos(require.context('../static', false, /\.(svg)$/));


const masthead = {
    background: 'linear-gradient(#16222A, #343a44)',
    height: '100vh'
}

const fontPrimary = {
    fontFamily: `'Ubuntu', sans-serif`,
    fontWeight: 'bold'
}


const filterByCallback = function callback(option, props) {
    return (
        props.text.toLowerCase().indexOf(option.first_name.toLowerCase()) !== -1 ||
        props.text.toLowerCase().indexOf(props.text.toLowerCase()) !== -1
    )
}

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            options: []
          };
        this._handleSearch = this._handleSearch.bind(this);
        this.setTeamColours = this.setTeamColours.bind(this);
        this.routeToResults = this.routeToResults.bind(this);
    }
    
    componentDidMount() {
        this.setState({isLoading:false})
    }

    setTeamColours(searchData){
    
        searchData.forEach(element => {
            element["colour"]=getMainColor(element.team.abbreviation)
        });

        this.setState({ options: searchData})
    }

    getTeamLogo(team)
    {
        return teamLogos[team];
    }

    _handleSearch = debounce(1000, function(query) {
        this.setState({isLoading: true});
        fetch(`https://www.balldontlie.io/api/v1/players?search=${query}`)
        .then(resp => resp.json())
        .then(res=>{ 
            this.setTeamColours(res.data)
            this.setState({
                isLoading: false
            })
        })
    });

    routeToResults(e)
    {
        this.props.onResultRoute(e[0]);            
        Router.push({
            pathname: '/results'
        })
    }
    
    render() {
        return (
            <div style={masthead} className="position-relative overflow-hidden text-center">
                <div className="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 className="display-4 text-light" style={fontPrimary}>Swish Stats</h1>
                </div>

                <AsyncTypeahead
                    id="Search"
                    filterBy={ filterByCallback}
                    labelKey={(option) => `${option.first_name} ${option.last_name}`}
                    isLoading={this.state.isLoading}
                    minLength={3}
                    onSearch={this._handleSearch}
                    onChange={(e) => this.routeToResults(e)}
                    placeholder="Search Player Name"
                    className="col-md-5 p-lg-5 mx-auto my-5"
                    options={this.state.options}
                    renderMenuItemChildren={(option) => (
                        <div className="col-xs-*">
                            {option.first_name} {option.last_name}
                            <div>
                                <img style={{maxHeight: '50px'}}src={this.getTeamLogo(option.team.abbreviation)}></img>
                                <span class="badge" style={{backgroundColor: option.colour.hex, color: 'white'}}>{option.team.full_name}</span>
                            </div>
                        </div>
                    )}
                />
                <div className="product-device shadow-sm d-none d-md-block"></div>
                <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
            </div>
        )
    }
}
