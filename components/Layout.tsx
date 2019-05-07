import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Header from './Header';
import Head from 'next/head';
import * as React from 'react';

export default class Layout extends React.Component {

  render() {
    return (
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
        {this.props.children}
      </div>
    );
  }
}
