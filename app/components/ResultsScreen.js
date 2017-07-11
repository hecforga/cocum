import React from 'react';
import { Constants } from 'expo';

import ResultsStateHolder from './ResultsStateHolder.js';
import HeaderButtonStateHolder from './header/HeaderButtonStateHolder.js';

const ResultsScreen = ({ navigation }) => (
  <ResultsStateHolder />
);

ResultsScreen.navigationOptions = ({ navigation }) => ({
  title: 'Resultados',
  headerRight: (
  <HeaderButtonStateHolder
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
