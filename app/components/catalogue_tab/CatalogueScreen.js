import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import DeviceInfo from 'react-native-device-info';
import firebase from 'react-native-firebase';

import { getTabNameForCatalogueScreen } from '../../utilities/tabsInfo.js';

import CatalogueContainer from './CatalogueContainer.js';

class CatalogueScreen extends Component {
  componentWillMount() {
    this.buildNumber = parseInt(DeviceInfo.getBuildNumber());
    if (this.buildNumber >= 8) {
      firebase.analytics().setCurrentScreen('Catalogue');
    }

    // react-native-google-analytics_bridge
    this.tracker = new GoogleAnalyticsTracker('UA-106460906-1');
    this.tracker.trackScreenView('Catalogue');
  }

  render() {
    const { navigation } = this.props;

    return (
      <CatalogueContainer
        navigation={navigation}
        tabName={getTabNameForCatalogueScreen()}
        level={0}
      />
    )
  }
}

CatalogueScreen.navigationOptions = ({ navigation }) => ({
  title: 'Catálogo',
  headerStyle: Platform.OS === 'android' ? { marginTop: Constants.statusBarHeight } : null
});

export default CatalogueScreen;
