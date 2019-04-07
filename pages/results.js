import Layout from '../components/Layout.js'

const masthead = {
    background: 'linear-gradient(#16222A, #343a44)',
    height: '100vh'
}

const fontPrimary = {
    fontFamily: `'Ubuntu', sans-serif`,
    fontWeight: 'bold'
}

export default function Results() {
  return (
    <Layout>
    <div style={masthead} className="position-relative overflow-hidden text-center">
            <div className="col-md-5 p-lg-5 mx-auto my-5">
                <h1 className="display-4 text-light" style={fontPrimary}>Results</h1>
            </div>
            <div className="product-device shadow-sm d-none d-md-block"></div>
            <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
        </div>
    </Layout>
  )
}