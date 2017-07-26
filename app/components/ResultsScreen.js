import React from 'react';
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
    iconSize={30}
    onPress={() => {
      navigation.goBack(null);
      navigation.goBack(null);
    }}
  />
  ),
  headerStyle: { marginTop: Constants.statusBarHeight }
});

export default ResultsScreen;
