import { AppNavigator } from '../navigators/AppNavigator.js';

// Commented because it was causing problems with TabNavigator
//const initialNavState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));
const initialNavState = null;

const nav = (state = initialNavState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export default nav;