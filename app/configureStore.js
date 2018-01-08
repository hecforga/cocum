import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import screenTracking from './middlewares/screenTracking.js';
import nav from './reducers/navigation.js';
import categorySelection from './reducers/categorySelection.js';
import selectedImage from './reducers/selectedImage.js';
import query from './reducers/query.js';
import results from './reducers/results.js';
import cocumIt from './reducers/cocumIt.js';
import filters from './reducers/filters.js';
import canGoNext from './reducers/canGoNext.js';
import webView from './reducers/webView.js';

const configureStore = (client) => {

  const middlewares = [thunk, screenTracking];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }
  middlewares.push(client.middleware());

  return createStore(
    combineReducers({
      nav,
      categorySelection,
      selectedImage,
      query,
      results,
      cocumIt,
      filters,
      canGoNext,
      webView,
      apollo: client.reducer()
    }),
    applyMiddleware(...middlewares)
  );
};

export default configureStore;