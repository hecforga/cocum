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
    case 'FETCH_RESULTS_SUCCESS':
      return {
        ...state,
        [action.tabName]: updateItemAtPosition(state[action.tabName], state[action.tabName].length - 1, action.response)
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
    case 'SET_QUERY_ID':
      return {
        ...state,
        [action.tabName]: updateItemAtPosition(state[action.tabName], state[action.tabName].length - 1, 'id_generated')
      };
    case 'UPLOAD_IMAGE_SUCCESS':
      return {
        ...state,
        [action.tabName]: updateItemAtPosition(state[action.tabName], state[action.tabName].length - 1, 'image_uploaded')
      };
    case 'APPLY_FILTERS':
      return {
        ...state,
        [action.tabName]: updateItemAtPosition(state[action.tabName], state[action.tabName].length - 1, 'filters_applied')
      };
    case 'FETCH_RESULTS_SUCCESS':
      return {
        ...state,
        [action.tabName]: updateItemAtPosition(state[action.tabName], state[action.tabName].length - 1, 'results_ready')
      };
    case 'FETCH_RESULTS_FAILURE':
      return {
        ...state,
        [action.tabName]: updateItemAtPosition(state[action.tabName], state[action.tabName].length - 1, 'error')
      };
    case 'APOLLO_QUERY_RESULT':
    case 'APOLLO_QUERY_RESULT_CLIENT':
      let activeTabName;
      if (action.operationName === 'getProductsByIds') {
        activeTabName = tabs.find((tabName) => state[tabName][state[tabName].length - 1] === 'results_ready');
        if (activeTabName) {
          return {
            ...state,
            [activeTabName]: updateItemAtPosition(state[activeTabName], state[activeTabName].length - 1, 'apollo_results_ready')
          };
        }
      }
      return state;
    case 'APOLLO_RESULTS_READY_MANUAL':
      return {
        ...state,
        [action.tabName]: updateItemAtPosition(state[action.tabName], state[action.tabName].length - 1, 'apollo_results_ready')
      };
    default:
      return state;
  }
};

const errorMessage = (state = generateInitialState(null), action) => {
  switch (action.type) {
    case 'ON_RESULTS_WILL_MOUNT':
    case 'FETCH_RESULTS_REQUEST':
    case 'FETCH_RESULTS_SUCCESS':
      return {
        ...state,
        [action.tabName]: null
      };
    case 'FETCH_RESULTS_FAILURE':
      return {
        ...state,
        [action.tabName]: action.message
      };
    default:
      return state;
  }
};

const activeLevel = (state = generateInitialState(-1), action) => {
  switch (action.type) {
    case 'ON_RESULTS_WILL_MOUNT':
      return {
        ...state,
        [action.tabName]: state[action.tabName] + 1
      };
    case 'ON_RESULTS_WILL_UNMOUNT':
      return {
        ...state,
        [action.tabName]: state[action.tabName] - 1
      };
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

export const getIdsAtLevel = (state, tabName, level) => state.ids[tabName][level];
export const getStatusAtLevel = (state, tabName, level) => state.status[tabName][level];
export const getErrorMessage = (state, tabName) => state.errorMessage[tabName];
export const getActiveLevel = (state, tabName) => state.activeLevel[tabName];