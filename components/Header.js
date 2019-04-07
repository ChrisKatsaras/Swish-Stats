import React from 'react'
import Navbar  from 'react-bootstrap/Navbar'
import Nav  from 'react-bootstrap/Nav'
import Link from 'next/link'


export default class Header extends React.Component {
  static async getInitialProps() {
    return {}
  }
  
  render() {
      
    const linkStyle = {
        marginRight: 15
    }
    const navbarBackground = {
        background: 'transparent'
    }

    const fontPrimary = {
        fontFamily: `'Ubuntu', sans-serif`,
        fontWeight: 'bold'
    }
    

    return (
        <Navbar style={navbarBackground} fixed="top" variant="dark" >
            <Navbar.Brand style={fontPrimary}>Swish Stats</Navbar.Brand>
            <Nav className="mr-auto">
                <Link href="/">
                    <a style={linkStyle}>Home</a>
                </Link>
                <Link href="/results">
                    <a style={linkStyle}>Results</a>
                </Link>
            </Nav>
        </Navbar>
    )
  }
}