import React , { Component } from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

import { getTabNameForTrendingScreen } from '../../utilities/tabsInfo.js';

import TrendingContainer from './TrendingContainer.js';

class TrendingScreen extends Component {
  componentWillMount() {
    this.tracker = new GoogleAnalyticsTracker('UA-106460906-1');
    this.tracker.trackScreenView('Trending');
  }

  render() {
    const { navigation } = this.props;

    return (
      <TrendingContainer
        navigation={navigation}
        tabName={getTabNameForTrendingScreen()}
        level={0}
      />
    )
  }
}

TrendingScreen.navigationOptions = ({ navigation }) => ({
  title: 'Trending',
  headerStyle: Platform.OS === 'android' ? { marginTop: Constants.statusBarHeight } : null
});

export default TrendingScreen;
