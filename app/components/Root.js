import React, { PropTypes } from 'react';
import { ApolloProvider } from 'react-apollo';

import AppWithNavigationState from '../navigators/AppNavigator.js';

const Root = ({ store, client }) => (
  <ApolloProvider store={store} client={client}>
    <AppWithNavigationState />
  </ApolloProvider>
);

export default Root;
