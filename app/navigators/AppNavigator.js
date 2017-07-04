import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import HomeScreen from '../components/HomeScreen.js';
import ImageSelectionScreen from '../components/ImageSelectionScreen.js';
import CategorySelectionScreen from '../components/CategorySelectionScreen.js';
import ResultsScreen from '../components/ResultsScreen.js';

export const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  ImageSelection: { screen: ImageSelectionScreen },
  CategorySelection: { screen: CategorySelectionScreen },
  Results: { screen: ResultsScreen }
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={ addNavigationHelpers({ dispatch, state: nav }) } />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);