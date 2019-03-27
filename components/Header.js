import React from 'react'
import  Navbar  from 'react-bootstrap/Navbar'

export default class Header extends React.Component {
  static async getInitialProps() {
    return {}
  }
  render() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  
        </Navbar>
    )
  }
}