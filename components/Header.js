import React from 'react'
import  Navbar  from 'react-bootstrap/Navbar'
import  Nav  from 'react-bootstrap/Nav'
import Link from 'next/link'


export default class Header extends React.Component {
  static async getInitialProps() {
    return {}
  }
  
  render() {
      
    const linkStyle = {
        marginRight: 15
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>NBA Stats</Navbar.Brand>
            <Nav className="mr-auto">
                <Link href="/">
                    <a style={linkStyle}>Home</a>
                </Link>
                <Link href="/about">
                    <a style={linkStyle}>About</a>
                </Link>
            </Nav>
        </Navbar>
    )
  }
}