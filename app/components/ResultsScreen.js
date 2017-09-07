import React from 'react';
import { Platform, View } from 'react-native';
import { Constants } from 'expo';

import { getCategoryLabel } from '../utilities/categoriesInfo.js';

import ResultsContainer from './ResultsContainer.js';
import CocumItResultsContainer from './CocumItResultsContainer.js';
import HeaderButtonContainerWithState from './header/HeaderButtonContainer.js';

const ResultsScreen = ({ navigation }) => (
  <View style={{flex: 1}}>
    {navigation.state.params.level === 0 ?
      <ResultsContainer navigation={navigation} level={navigation.state.params.level} />
      :
      <CocumItResultsContainer navigation={navigation} level={navigation.state.params.level} />
    }
  </View>
);

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
