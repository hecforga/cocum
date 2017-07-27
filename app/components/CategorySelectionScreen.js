import React from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';

import CategorySelectionContainerWithState from './CategorySelectionContainer.js';
import HeaderButtonContainerWithState from './header/HeaderButtonContainer.js';

const CategorySelectionScreen = ({ navigation }) => (
  <CategorySelectionContainerWithState navigation= {navigation} />
);

CategorySelectionScreen.navigationOptions = ({ navigation }) => ({
  title: 'Recortar',
  headerRight: (
    <HeaderButtonContainerWithState
      title='BUSCAR'
      onPress={() => {
        navigation.navigate('Results');
      }}
    />
  ),
  headerStyle: Platform.OS === 'android' ? { marginTop: Constants.statusBarHeight } : null
});

export default CategorySelectionScreen;
