import { combineReducers } from 'redux';

import { pushToArray, popFromArray, updateItemAtPosition } from '../utilities/immutableUpdateFunctions.js';

const ids = (state = [], action) => {
  switch (action.type) {
    case 'ON_RESULTS_WILL_MOUNT':
      return pushToArray(state, []);
    case 'ON_RESULTS_WILL_UNMOUNT':
      return popFromArray(state);
    case 'FETCH_RESULTS_SUCCESS':
      const pos = state.length - 1;
      const newItem = action.response.map(id => id);
      return updateItemAtPosition(state, pos, newItem);
    default:
      return state;
  }
};

const status = (state = [], action) => {
  switch (action.type) {
    case 'ON_RESULTS_WILL_MOUNT':
      return pushToArray(state, 'init');
    case 'ON_RESULTS_WILL_UNMOUNT':
      return popFromArray(state);
    case 'CROP_IMAGE_SUCCESS':
      return updateItemAtPosition(state, state.length - 1, 'image_cropped');
    case 'SET_QUERY_ID':
      return updateItemAtPosition(state, state.length - 1, 'id_generated');
    case 'UPLOAD_IMAGE_SUCCESS':
      return updateItemAtPosition(state, state.length - 1, 'image_uploaded');
    case 'APPLY_FILTERS':
      return updateItemAtPosition(state, state.length - 1, 'filters_applied');
    case 'FETCH_RESULTS_SUCCESS':
      return updateItemAtPosition(state, state.length - 1, 'results_ready');
    case 'FETCH_RESULTS_FAILURE':
      return updateItemAtPosition(state, state.length - 1, 'error');
    case 'APOLLO_QUERY_RESULT':
    case 'APOLLO_QUERY_RESULT_CLIENT':
      let newState = state;
      if (state[state.length - 1] === 'results_ready' && action.operationName === 'getProductsByIds') {
        newState = 'apollo_results_ready';
      }
      return updateItemAtPosition(state, state.length - 1, newState);
    default:
      return state;
  }
};

const errorMessageInitialState = null;
const errorMessage = (state = errorMessageInitialState, action) => {
  switch (action.type) {
    case 'ON_RESULTS_WILL_MOUNT':
      return errorMessageInitialState;
    case 'FETCH_RESULTS_FAILURE':
      return action.message; 
    case 'FETCH_RESULTS_REQUEST':
    case 'FETCH_RESULTS_SUCCESS':
      return null;
    default:
      return state;
  }
};

const activeLevelInitialState = -1;
const activeLevel = (state = activeLevelInitialState, action) => {
  switch (action.type) {
    case 'ON_RESULTS_WILL_MOUNT':
      return state + 1;
    case 'ON_RESULTS_WILL_UNMOUNT':
      return state - 1;
    default:
      return state;
  }
};

const results = combineReducers({
  ids,
  status,
  errorMessage,
  activeLevel
});

export default results;

export const getIdsAtLevel = (state, level) => state.ids[level];
export const getStatusAtLevel = (state, level) => state.status[level];
export const getErrorMessage = (state) => state.errorMessage;
export const getActiveLevel = (state) => state.activeLevel;