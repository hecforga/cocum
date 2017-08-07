import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import nav from './reducers/navigation.js';
import selectedImage from './reducers/selectedImage.js';
import query from './reducers/query.js';
import results from './reducers/results.js';
import canGoNext from './reducers/canGoNext.js';
import ratingBarState from './reducers/ratingBarState.js';

const configureStore = (client) => {

  const middlewares = [thunk, createLogger(), client.middleware()];

  return createStore(
    combineReducers({
      nav,
      selectedImage,
      query,
      results,
      canGoNext,
      ratingBarState,
      apollo: client.reducer()
    }),
    applyMiddleware(...middlewares)
  );
};

export default configureStore;