import { combineReducers } from 'redux';

import { pushToArray, popFromArray, updateItemAtPosition } from '../utilities/immutableUpdateFunctions.js';

const initialState = {
  minPrice: null,
  maxPrice: null,
  shops: []
};

const current = (state = initialState, action) => {
  let newShops = state.shops;

  switch (action.type) {
    case 'INIT_CURRENT_FILTERS':
      return action.appliedFilters;
    case 'SET_MIN_PRICE_FILTER':
      return {
        ...state,
        minPrice: action.minPrice
      };
    case 'SET_MAX_PRICE_FILTER':
      return {
        ...state,
        maxPrice: action.maxPrice
      };
    case 'ADD_SHOP_FILTER':
      newShops = state.shops.concat(action.shop);
      return {
        ...state,
        shops: newShops
      };
    case 'REMOVE_SHOP_FILTER':
      const index = state.shops.indexOf(action.shop);
      if (index > -1) {
        newShops = [
          ...state.shops.slice(0, index),
          ...state.shops.slice(index + 1)
        ];
      }
      return {
        ...state,
        shops: newShops
      };
    case 'CLEAR_FILTERS':
      return initialState;
    default:
      return state;
  }
};

const applied = (state = [], action) => {
  switch (action.type) {
    case 'ON_RESULTS_WILL_MOUNT':
      return pushToArray(state, initialState);
    case 'ON_RESULTS_WILL_UNMOUNT':
      return popFromArray(state);
    case 'APPLY_FILTERS':
      return updateItemAtPosition(state, state.length - 1, action.filters);
    default:
      return state;
  }
};

const filters = combineReducers({
  current,
  applied
});

export default filters;

export const getCurrentFilters = (state) => state.current;
export const areFiltersCleared = (state) => {
  return state.current.minPrice === initialState.minPrice &&
    state.current.maxPrice === initialState.maxPrice &&
    state.current.shops.length === 0;
};
export const areFiltersValid = (state) => {
  if (state.current.minPrice) {
    const minPrice = parseInt(state.current.minPrice);
    if (isNaN(minPrice)) {
      return false;
    }

    if (state.current.maxPrice) {
      const maxPrice = parseInt(state.current.maxPrice);
      if (isNaN(maxPrice)) {
        return false;
      }

      if (minPrice > maxPrice) {
        return false;
      }
    }
  }

  return true;
};
export const getAppliedFiltersAtLevel = (state, level) => state.applied[level];