import React from 'react';
import { Constants } from 'expo';

import CategorySelectionStateHolder from './CategorySelectionStateHolder.js';
import HeaderButtonStateHolder from './header/HeaderButtonStateHolder.js';

const CategorySelectionScreen = ({ navigation }) => (
  <CategorySelectionStateHolder navigation= {navigation} />
);

CategorySelectionScreen.navigationOptions = ({ navigation }) => ({
  title: 'Recortar',
  headerRight: (
    <HeaderButtonStateHolder
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
