import { pushToArray, popFromArray, updateItemAtPosition } from '../utilities/immutableUpdateFunctions.js';
import { generateInitialState } from '../utilities/tabsInfo.js';

const selectedProducts = (state = generateInitialState([]), action) => {
  switch (action.type) {
    case 'ON_RESULTS_WILL_MOUNT':
      return {
        ...state,
        [action.tabName]: pushToArray(state[action.tabName], null)
      };
    case 'ON_RESULTS_WILL_UNMOUNT':
      const auxArray = popFromArray(state[action.tabName]);
      return {
        ...state,
        [action.tabName]: updateItemAtPosition(auxArray, auxArray.length - 1, null)
      };
    case 'SET_SELECTED_PRODUCT':
      return {
        ...state,
        [action.tabName]: updateItemAtPosition(state[action.tabName], state[action.tabName].length - 1, action.product)
      };
    default:
      return state;
  }
};

export default selectedProducts;

export const getSelectedProductAtLevel = (state, tabName, level) =>
  state[tabName][level];