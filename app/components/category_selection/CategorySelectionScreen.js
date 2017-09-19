import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

import CategorySelectionContainerWithState from './CategorySelectionContainer.js';
import HeaderButtonContainerWithState from '../header/HeaderButtonContainer.js';

class CategorySelectionScreen extends Component {

  componentWillMount() {
    this.tracker = new GoogleAnalyticsTracker('UA-106460906-1');
    this.tracker.trackScreenView('CategorySelection');

  }

  render() {
    const { navigation } = this.props;

    return (
      <CategorySelectionContainerWithState navigation={navigation} />
    );
  }
}

CategorySelectionScreen.navigationOptions = ({ navigation }) => ({
  title: 'Recortar',
  headerRight: (
    <HeaderButtonContainerWithState
      title='Buscar'
      onPress={(state) => {
        navigation.navigate('Results', {
          tabName: navigation.state.params.tabName,
          category: state.query.category,
          fetchMode: 'url',
          level: 0
        });
      }}
    />
  ),
  headerStyle: Platform.OS === 'android' ? { marginTop: Constants.statusBarHeight } : null,
  tabBarVisible: false
});

export default CategorySelectionScreen;
