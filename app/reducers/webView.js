import { combineReducers } from 'redux';

const canGoBackInitialState = false;
const canGoBack = (state = canGoBackInitialState, action) => {
  switch (action.type) {
    case 'SET_WEB_VIEW_CAN_GO_BACK':
      return action.canGoBack;
    case 'ON_WEB_VIEW_WILL_UNMOUNT':
      return canGoBackInitialState;
    default:
      return state;
  }
};

const canGoForwardInitialState = false;
const canGoForward = (state = canGoForwardInitialState, action) => {
  switch (action.type) {
    case 'SET_WEB_VIEW_CAN_GO_FORWARD':
      return action.canGoForward;
    case 'ON_WEB_VIEW_WILL_UNMOUNT':
      return canGoForwardInitialState;
    default:
      return state;
  }
};

const isLoadingInitialState = true;
const isLoading = (state = isLoadingInitialState, action) => {
  switch (action.type) {
    case 'SET_WEB_VIEW_IS_LOADING':
      return action.isLoading;
    case 'ON_WEB_VIEW_WILL_UNMOUNT':
      return isLoadingInitialState;
    default:
      return state;
  }
};

const webView = combineReducers({
  canGoBack,
  canGoForward,
  isLoading
});

export default webView;

export const getCanGoBack = (state) => state.canGoBack;
export const getCanGoForward = (state) => state.canGoForward;
export const getIsLoading = (state) => state.isLoading;