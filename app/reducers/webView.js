import { combineReducers } from 'redux';

const canGoBack = (state = false, action) => {
  switch (action.type) {
    case 'SET_WEB_VIEW_CAN_GO_BACK':
      return action.canGoBack;
    case 'RESET_WEB_VIEW':
      return false;
    default:
      return state;
  }
};

const canGoForward = (state = false, action) => {
  switch (action.type) {
    case 'SET_WEB_VIEW_CAN_GO_FORWARD':
      return action.canGoForward;
    case 'RESET_WEB_VIEW':
      return false;
    default:
      return state;
  }
};

const isLoading = (state = true, action) => {
  switch (action.type) {
    case 'SET_WEB_VIEW_IS_LOADING':
      return action.isLoading;
    case 'RESET_WEB_VIEW':
      return true;
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