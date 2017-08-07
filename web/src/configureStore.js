import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import query from './reducers/query.js';
import results from './reducers/results.js';

const configureStore = (client) => {

  const middlewares = [thunk, createLogger(), client.middleware()];

  return createStore(
    combineReducers({
      query,
      results,
      apollo: client.reducer()
    }),
    applyMiddleware(...middlewares)
  );
};

export default configureStore;