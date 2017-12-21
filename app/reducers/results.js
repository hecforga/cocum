import { combineReducers } from 'redux';

import { pushToArray, popFromArray, updateItemAtPosition } from '../utilities/immutableUpdateFunctions.js';
import tabs, { generateInitialState } from '../utilities/tabsInfo.js';

const ids = (state = generateInitialState([]), action) => {
  switch (action.type) {
    case 'ON_RESULTS_WILL_MOUNT':
      return {
        ...state,
        [action.tabName]: pushToArray(state[action.tabName], [])
      };
    case 'ON_RESULTS_WILL_UNMOUNT':
      return {
        ...state,
        [action.tabName]: popFromArray(state[action.tabName])
      };
    case 'COMPUTE_RESULTS_SUCCESS':
      return {
        ...state,
        [action.tabName]: updateItemAtPosition(state[action.tabName], state[action.tabName].length - 1, action.ids)
      };
    default:
      return state;
  }
};

const status = (state = generateInitialState([]), action) => {
  switch (action.type) {
    case 'ON_RESULTS_WILL_MOUNT':
      return {
        ...state,
        [action.tabName]: pushToArray(state[action.tabName], 'init')
      };
    case 'ON_RESULTS_WILL_UNMOUNT':
      return {
        ...state,
        [action.tabName]: popFromArray(state[action.tabName])
      };
    case 'CROP_IMAGE_SUCCESS':
      return {
        ...state,
        [action.tabName]: updateItemAtPosition(state[action.tabName], state[action.tabName].length - 1, 'image_cropped')
      };
    case 'COMPUTE_PREDICTIONS_SUCCESS':
      if (action.croppedImageUrl) {
        return {
          ...state,
          ['HomeTab']: updateItemAtPosition(state['HomeTab'], state['HomeTab'].length - 1, 'ready_to_compute_results')
        };
      } else {
        return state;
      }
    case 'UPLOAD_CROPPED_IMAGE_SUCCESS':
      if (action.tags !== null) {
        return {
          ...state,
          [action.tabName]: updateItemAtPosition(state[action.tabName], state[action.tabName].length - 1, 'ready_to_compute_results')
        };
      } else {
        return {
          ...state,
          [action.tabName]: updateItemAtPosition(state[action.tabName], state[action.tabName].length - 1, 'cropped_image_uploaded')
        };
      }
    case 'APPLY_FILTERS':
      return {
        ...state,
        [action.tabName]: updateItemAtPosition(state[action.tabName], state[action.tabName].length - 1, 'filters_applied')
      };
    case 'GET_PRODUCT_TAGS_SUCCESS':
      return {
        ...state,
        [action.tabName]: updateItemAtPosition(state[action.tabName], state[action.tabName].length - 1, 'product_tags_got')
      };
    case 'COMPUTE_RESULTS_SUCCESS':
      return {
        ...state,
        [action.tabName]: updateItemAtPosition(state[action.tabName], state[action.tabName].length - 1, 'results_computed')
      };
    case 'RESULTS_FAILURE':
      return {
        ...state,
        [action.tabName]: updateItemAtPosition(state[action.tabName], state[action.tabName].length - 1, 'error')
      };
    case 'ON_RESULTS_RETRY_PRESS':
      return {
        ...state,
        [action.tabName]: updateItemAtPosition(state[action.tabName], state[action.tabName].length - 1, 'retry')
      };
    default:
      return state;
  }
};

const errorMessage = (state = generateInitialState(null), action) => {
  switch (action.type) {
    case 'ON_RESULTS_WILL_MOUNT':
    case 'COMPUTE_RESULTS_SUCCESS':
      return {
        ...state,
        [action.tabName]: null
      };
    case 'RESULTS_FAILURE':
      return {
        ...state,
        [action.tabName]: action.message
      };
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

export const getIdsAtLevel = (state, tabName, level) => state.ids[tabName][level];
export const getStatusAtLevel = (state, tabName, level) => state.status[tabName][level];
export const getErrorMessage = (state, tabName) => state.errorMessage[tabName];