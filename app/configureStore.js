import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import nav from './reducers/navigation.js';
import queries from './reducers/queries.js';
import query from './reducers/query.js';
import results from './reducers/results.js';

const configureStore = (client) => {

  const middlewares = [thunk, createLogger(), client.middleware()];

  return createStore(
    combineReducers({
      nav,
      queries,
      query,
      results,
      apollo: client.reducer()
    }),
    applyMiddleware(...middlewares)
  );
};

export default configureStore;