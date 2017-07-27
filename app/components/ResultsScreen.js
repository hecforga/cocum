import React from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';

import ResultsContainerWithDataAndState from './ResultsContainer.js';
import HeaderButtonContainerWithState from './header/HeaderButtonContainer.js';

const ResultsScreen = ({ navigation }) => (
  <ResultsContainerWithDataAndState />
);

ResultsScreen.navigationOptions = ({ navigation }) => ({
  title: 'Resultados',
  headerRight: (
  <HeaderButtonContainerWithState
    iconName='home'
    onPress={() => {
      navigation.goBack(null);
      navigation.goBack(null);
    }}
  />
  ),
  headerStyle: Platform.OS === 'android' ? { marginTop: Constants.statusBarHeight } : null
});

export default ResultsScreen;
