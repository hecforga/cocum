import { combineReducers } from 'redux';

const productIdInitialState = '';
const productId = (state = productIdInitialState, action) => {
  switch (action.type) {
    case 'SET_COCUM_IT_PRODUCT_ID':
      return action.productId;
    case 'ON_COCUM_IT_RESULTS_WILL_UNMOUNT':
      return productIdInitialState;
    default:
      return state;
  }
};

const tagsInitialState = null;
const tags = (state = tagsInitialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCT_TAGS_SUCCESS':
      return action.tags;
    case 'ON_COCUM_IT_RESULTS_WILL_UNMOUNT':
      return tagsInitialState;
    default:
      return state;
  }
};

const cocumIt = combineReducers({
  productId,
  tags
});

export default cocumIt;

export const getProductId = (state) =>
  state.productId;

export const getTags = (state) =>
  state.tags;