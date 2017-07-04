import { combineReducers } from 'redux';

const ids = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_RESULTS_SUCCESS':
      return action.response.map(id => id);
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_RESULTS_REQUEST':
      return true;
    case 'FETCH_RESULTS_SUCCESS':
    case 'FETCH_RESULTS_FAILURE':
      return false;
    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_RESULTS_FAILURE':
      return action.message;
    case 'FETCH_RESULTS_REQUEST':
    case 'FETCH_RESULTS_SUCCESS':
      return null;
    default:
      return state;
  }
};

const results = combineReducers({
  ids,
  isFetching,
  errorMessage
});

export default results;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;