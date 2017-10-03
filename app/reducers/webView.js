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

const webView = combineReducers({
  canGoBack,
  canGoForward
});

export default webView;

export const getCanGoBack = (state) => state.canGoBack;
export const getCanGoForward = (state) => state.canGoForward;