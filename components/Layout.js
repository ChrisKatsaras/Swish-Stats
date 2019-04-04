import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import Head from 'next/head'

const Layout = props => (
  <div>
    <Header />
    {props.children}
  </div>
)

export default Layout