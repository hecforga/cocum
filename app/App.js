import React from 'react';
import { ApolloClient, createNetworkInterface } from 'react-apollo';

import configureStore from './configureStore.js';

import Root from './components/Root.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const networkInterface = createNetworkInterface({
      uri: 'https://api.graph.cool/simple/v1/cj2grdzj0e72c0123e02e884g'
    });
    this.client = new ApolloClient({
      networkInterface: networkInterface
    });

    this.store = configureStore(this.client);
  }

  render() {
    return (
      <Root store={this.store} client={this.client}/>
    );
  }
}