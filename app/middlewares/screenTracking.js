import { NavigationActions } from 'react-navigation';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

const tracker = new GoogleAnalyticsTracker('UA-106460906-1');

const excludedScreens = ['Home', 'Results'];  // Initial screen plus screens with custom/conditional tracking names: e.g. 'Results_vestidos_url'

const screenTracking = ({ getState }) => next => (action) => {
  if (action.type !== NavigationActions.NAVIGATE && action.type !== NavigationActions.BACK) {
    return next(action);
  }

  const currentScreen = getCurrentRouteName(getState().nav);
  const result = next(action);
  const nextScreen = getCurrentRouteName(getState().nav);
  if (nextScreen !== currentScreen && excludedScreens.indexOf(nextScreen) < 0) {
    tracker.trackScreenView(nextScreen);
  }
  return result;
};

const getCurrentRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
};

export default screenTracking;