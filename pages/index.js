import Layout from '../components/Layout.js'
import Search from '../components/Search';

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
            <Layout>
                <Search/>
            </Layout>
        )
    }
}
