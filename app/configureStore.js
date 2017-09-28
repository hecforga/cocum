import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import nav from './reducers/navigation.js';
import selectedImage from './reducers/selectedImage.js';
import query from './reducers/query.js';
import results from './reducers/results.js';
import selectedProducts from './reducers/selectedProducts.js';
import filters from './reducers/filters.js';
import canGoNext from './reducers/canGoNext.js';

const configureStore = (client) => {

  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }
  middlewares.push(client.middleware());

  return createStore(
    combineReducers({
      nav,
      selectedImage,
      query,
      results,
      selectedProducts,
      filters,
      canGoNext,
      apollo: client.reducer()
    }),
    applyMiddleware(...middlewares)
  );
};

export default configureStore;