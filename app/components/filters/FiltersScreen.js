import React from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';

import FiltersContainerWithState from './FiltersContainer.js';

const FiltersScreen = ({ navigation }) => (
  <FiltersContainerWithState
    navigation={navigation}
    tabName={navigation.state.params.tabName}
    level={navigation.state.params.level} />
);

FiltersScreen.navigationOptions = ({ navigation }) => ({
  title: 'Filtros',
  headerStyle: Platform.OS === 'android' ? { marginTop: Constants.statusBarHeight } : null,
  tabBarVisible: false
});

export default FiltersScreen;
