import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import {BackAndroid, Alert } from 'react-native';

import HomeScreen from '../components/HomeScreen.js';
import CategorySelectionScreen from '../components/CategorySelectionScreen.js';
import ResultsScreen from '../components/ResultsScreen.js';

export const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  CategorySelection: { screen: CategorySelectionScreen},
  Results: { screen: ResultsScreen}
}, {
  navigationOptions: {
    headerBackTitle: null
  }
});

class AppWithNavigationState extends Component{

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', function() {
      const { dispatch, navigation, nav } = this.props;
      if (nav.index == 0) {
        Alert.alert(
        'Exit App',
        'Exiting the application?',
        [
        {text: 'Cancel', onPress: () =>  true, style: 'cancel'},
        {text: 'OK', onPress: () => BackAndroid.exitApp() },
        ],
        { cancelable: false }
        )
        return true;
      }
      // if (shouldCloseApp(nav)) return false
      dispatch({ type: 'Navigation/BACK' });
        return true;
      }.bind(this));
    }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
  }

  render() {
    return <AppNavigator navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.nav })} />
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);