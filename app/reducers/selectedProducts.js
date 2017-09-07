import { pushToArray, popFromArray, updateItemAtPosition } from '../utilities/immutableUpdateFunctions.js';

const selectedProducts = (state = [], action) => {
  let auxArray = [];
  switch (action.type) {
    case 'ON_RESULTS_WILL_MOUNT':
      return pushToArray(state, null);
    case 'ON_RESULTS_WILL_UNMOUNT':
      auxArray = popFromArray(state);
      return updateItemAtPosition(auxArray, auxArray.length - 1, null);
    case 'SET_SELECTED_PRODUCT':
      return updateItemAtPosition(state, state.length - 1, action.product);
    default:
      return state;
  }
};

export default selectedProducts;

export const getSelectedProductAtLevel = (state, level) =>
  state[level];