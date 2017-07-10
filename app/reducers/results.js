import { combineReducers } from 'redux';

const ids = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_RESULTS_SUCCESS':
      return action.response.map(id => id);
    default:
      return state;
  }
};

const status = (state = 'init', action) => {
  switch (action.type) {
    case 'SET_QUERY_IMAGE_URI':
      return 'image_cropped';
    case 'FETCH_RESULTS_SUCCESS':
      return 'results_ready';
    case 'FETCH_RESULTS_FAILURE':
      return 'error';
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
  status,
  errorMessage
});

export default results;

export const getIds = (state) => state.ids;
export const getStatus = (state) => state.status;
export const getErrorMessage = (state) => state.errorMessage;