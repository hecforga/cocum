import React, { Component } from 'react';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import { MuiThemeProvider } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './configureStore.js';

import HomePage from './pages/HomePage.js';

class App extends Component {
  constructor(props) {
    super(props);

    const networkInterface = createNetworkInterface({
      uri: 'https://api.graph.cool/simple/v1/cj2grdzj0e72c0123e02e884g'
    });
    this.client = new ApolloClient({
      networkInterface: networkInterface
    });

    this.store = configureStore(this.client);

    injectTapEventPlugin();
  }

  render() {
    return (
      <ApolloProvider store={this.store} client={this.client}>
        <MuiThemeProvider>
          <HomePage />
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
