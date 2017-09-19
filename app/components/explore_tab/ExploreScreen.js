import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

import { getTabNameForExploreScreen } from '../../utilities/tabsInfo.js';

import ExploreContainer from './ExploreContainer.js';

class ExploreScreen extends Component {
  componentWillMount() {
    this.tracker = new GoogleAnalyticsTracker('UA-106460906-1');
    this.tracker.trackScreenView('Explore');
  }

  render() {
    const { navigation } = this.props;

    return (
      <ExploreContainer
        navigation={navigation}
        tabName={getTabNameForExploreScreen()}
        level={0}
      />
    )
  }
}

ExploreScreen.navigationOptions = ({ navigation }) => ({
  title: 'Explorar',
  headerStyle: Platform.OS === 'android' ? { marginTop: Constants.statusBarHeight } : null
});

export default ExploreScreen;
