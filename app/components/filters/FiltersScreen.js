import React from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';

import FiltersContainerWithState from './FiltersContainer.js';
import HeaderButtonContainerWithState from '../header/HeaderButtonContainer.js';

const FiltersScreen = ({ navigation }) => (
  <FiltersContainerWithState navigation={navigation} level={navigation.state.params.level} />
);

FiltersScreen.navigationOptions = ({ navigation }) => ({
  title: 'Filtros',
  headerStyle: Platform.OS === 'android' ? { marginTop: Constants.statusBarHeight } : null
});

export default FiltersScreen;
