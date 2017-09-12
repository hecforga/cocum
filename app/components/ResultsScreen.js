import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';

import { getCategoryLabel } from '../utilities/categoriesInfo.js';

import QueryResultsContainer from './QueryResultsContainer.js';
import CocumItResultsContainer from './CocumItResultsContainer.js';
import RandomResultsContainer from './RandomResultsContainer.js';
import HeaderButtonContainerWithState from './header/HeaderButtonContainer.js';

class ResultsScreen extends Component {
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

ResultsScreen.navigationOptions = ({ navigation }) => ({
  title: getCategoryLabel(navigation.state.params.category),
  headerRight: (
    <HeaderButtonContainerWithState
      iconName='home'
      onPress={(state) => {
        let i = navigation.state.params.level;
        while (i >= 0) {
          navigation.goBack(null);
          i--;
        }
        navigation.goBack(null);
      }}
    />
  ),
  headerStyle: Platform.OS === 'android' ? { marginTop: Constants.statusBarHeight } : null
});

export default ResultsScreen;
