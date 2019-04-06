import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Header from './Header';
import Head from 'next/head'

const Layout = props => (
  <div>
    <Head>
      <title>Swish Stats</title>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"
      />
      <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet"/>
    </Head>
    <Header />
    {props.children}
  </div>
)

export default Layout