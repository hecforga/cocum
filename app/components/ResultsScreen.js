import React from 'react';
import { Button } from 'react-native';
import { Constants } from 'expo';

import ResultsStateHolder from './ResultsStateHolder.js';

const ResultsScreen = ({ navigation }) => (
  <ResultsStateHolder />
);

ResultsScreen.navigationOptions = ({ navigation }) => ({
  title: 'Resultados',
  headerRight: (
    <Button
      title='Nueva búsqueda'
      onPress={() => {
        navigation.goBack();
        navigation.goBack(null);
        navigation.navigate('CategorySelection');
      }}
    />),
  headerStyle: { marginTop: Constants.statusBarHeight }
});

export default ResultsScreen;
