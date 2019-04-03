import Layout from '../components/Layout.js'


const image = {
    backgroundImage: `url('../static/nba.jpg')`
}
const Index = (props) => (
    
    <Layout>
        <div  style={image} className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <div className="col-md-5 p-lg-5 mx-auto my-5">
                <h1 className="display-4 font-weight-normal">NBA Stats</h1>
                <p className="lead font-weight-normal">And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple’s marketing pages.</p>
                <a className="btn btn-outline-secondary" href="#">Coming soon</a>
            </div>
            <div className="product-device shadow-sm d-none d-md-block"></div>
            <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
        </div>

        
    </Layout>
)
  
export default Index