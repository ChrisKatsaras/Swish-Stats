
const masthead = {
    background: 'linear-gradient(#16222A, #343a44)',
    height: '100vh'
}

const fontPrimary = {
    fontFamily: `'Ubuntu', sans-serif`,
    fontWeight: 'bold'
}

export default class Results extends React.Component {
    constructor(props) {
        super(props);
    }
    render()
    {
        const test = this.props.playerId;
        console.log(test);
        return (
            <div style={masthead} className="position-relative overflow-hidden text-center">
                <div className="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 className="display-4 text-light" style={fontPrimary}>Results</h1>
                    <h2 className="display-4 text-light">{test}</h2>
                </div>
                <div className="product-device shadow-sm d-none d-md-block"></div>
                <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
            </div>
        )
    }
}