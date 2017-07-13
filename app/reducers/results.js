import { combineReducers } from 'redux';

const idsInitialState = [];
const ids = (state = idsInitialState, action) => {
  switch (action.type) {
    case 'FETCH_RESULTS_SUCCESS':
      return action.response.map(id => id);
    case 'RESET_RESULTS':
      return idsInitialState;
    default:
      return state;
  }
};

const statusInitialState = 'init';
const status = (state = statusInitialState, action) => {
  switch (action.type) {
    case 'CROP_IMAGE_SUCCESS':
      return 'image_cropped';
    case 'UPLOAD_IMAGE_SUCCESS':
      return 'image_uploaded';
    case 'FETCH_RESULTS_SUCCESS':
      return 'results_ready';
    case 'FETCH_RESULTS_FAILURE':
      return 'error';
    case 'RESET_RESULTS':
      return statusInitialState;
    default:
      return state;
  }
};

const errorMessageInitialState = null;
const errorMessage = (state = errorMessageInitialState, action) => {
  switch (action.type) {
    case 'FETCH_RESULTS_FAILURE':
      return action.message; 
    case 'FETCH_RESULTS_REQUEST':
    case 'FETCH_RESULTS_SUCCESS':
      return null;
    case 'RESET_RESULTS':
      return errorMessageInitialState;
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