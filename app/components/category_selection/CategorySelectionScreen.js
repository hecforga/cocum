import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import DeviceInfo from 'react-native-device-info';
import firebase from 'react-native-firebase';

import CategorySelectionContainer from './CategorySelectionContainer.js';
import HeaderButtonContainer from '../header/HeaderButtonContainer.js';

class CategorySelectionScreen extends Component {

  componentWillMount() {
    this.buildNumber = parseInt(DeviceInfo.getBuildNumber());
    if (this.buildNumber >= 8) {
      firebase.analytics().setCurrentScreen('CategorySelection');
    }

    // react-native-google-analytics_bridge
    this.tracker = new GoogleAnalyticsTracker('UA-106460906-1');
    this.tracker.trackScreenView('CategorySelection');

  }

  render() {
    const { navigation } = this.props;

    return (
      <CategorySelectionContainer navigation={navigation} />
    );
  }
}

CategorySelectionScreen.navigationOptions = ({ navigation }) => ({
  title: 'Recortar',
  headerRight: (
    <HeaderButtonContainer
      title='Buscar'
      onPress={(state) => {
        navigation.navigate('Results', {
          tabName: navigation.state.params.tabName,
          category: state.query.category,
          fetchMode: 'url',
          level: 0
        });
      }}
      isDisabled={(state) => !state.canGoNext}
      buttonStyle={{ minWidth: 80 }}
      containerStyle={{ marginRight: 8 }}
    />
  ),
  headerStyle: Platform.OS === 'android' ? { marginTop: Constants.statusBarHeight } : null,
  tabBarVisible: false
});

export default CategorySelectionScreen;
