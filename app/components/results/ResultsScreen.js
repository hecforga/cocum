import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import DeviceInfo from 'react-native-device-info';
import firebase from 'react-native-firebase';

import { getCategoryLabel } from '../../utilities/categoriesInfo.js';

import QueryResultsContainer from './QueryResultsContainer.js';
import CocumItResultsContainer from './CocumItResultsContainer.js';
import RandomResultsContainer from './RandomResultsContainer.js';
import HeaderButtonContainer from '../header/HeaderButtonContainer.js';

class ResultsScreen extends Component {
  componentWillMount() {
    const { navigation } = this.props;
    const fetchMode = navigation.state.params.fetchMode;
    const category = navigation.state.params.category;

    this.buildNumber = parseInt(DeviceInfo.getBuildNumber());
    if (this.buildNumber >= 8) {
      firebase.analytics().setCurrentScreen('Results_' + category + '_' + fetchMode);
    }

    // react-native-google-analytics_bridge
    tracker.trackScreenView('Results_' + category + '_' + fetchMode);

  }

  render() {
    const { navigation } = this.props;

    switch (navigation.state.params.fetchMode) {
      case 'url':
        return (
          <QueryResultsContainer
            navigation={navigation}
            category={navigation.state.params.category}
            tabName={navigation.state.params.tabName}
            level={navigation.state.params.level}
          />
        );
      case 'id':
        return (
          <CocumItResultsContainer
            navigation={navigation}
            category={navigation.state.params.category}
            tabName={navigation.state.params.tabName}
            level={navigation.state.params.level}
          />
        );
      case 'random':
      default:
        return (
          <RandomResultsContainer
            navigation={navigation}
            category={navigation.state.params.category}
            tabName={navigation.state.params.tabName}
            level={navigation.state.params.level}
          />
        );
    }
  }
}

// react-native-google-analytics_bridge
const tracker = new GoogleAnalyticsTracker('UA-106460906-1');

ResultsScreen.navigationOptions = ({ navigation }) => ({
  title: getCategoryLabel(navigation.state.params.category),
  headerRight: (
    <HeaderButtonContainer
      iconName='home'
      onPress={(state) => {
        if (this.buildNumber >= 8) {
          firebase.analytics().logEvent('resultsHeaderHomeButton_pressed');
        }

        // react-native-google-analytics_bridge
        tracker.trackEvent('button', 'pressed', { label: 'ResultsHeaderHome'} );

        let i = navigation.state.params.level;
        while (i >= 0) {
          navigation.goBack(null);
          i--;
        }
        navigation.goBack(null);
      }}
      isDisabled={(state) => !state.canGoNext}
      buttonStyle={{ minWidth: 80 }}
      containerStyle={{ marginRight: 8 }}
    />
  ),
  headerStyle: Platform.OS === 'android' ? { marginTop: Constants.statusBarHeight } : null
});

export default ResultsScreen;
