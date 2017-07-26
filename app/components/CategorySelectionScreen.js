import React from 'react';
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
      iconName='search'
      iconSize={20}
      onPress={() => {
        navigation.navigate('Results');
      }}
    />
  ),
  headerStyle: { marginTop: Constants.statusBarHeight}
});

export default CategorySelectionScreen;
