import React from 'react';
import { Button } from 'react-native';
import { Constants } from 'expo';

import CategorySelectionStateHolder from './CategorySelectionStateHolder.js';

const CategorySelectionScreen = ({ navigation }) => (
  <CategorySelectionStateHolder />
);

CategorySelectionScreen.navigationOptions = ({ navigation }) => ({
  title: 'Selecciona una categoría',
  headerRight: (
    <Button
      title='Buscar'
      onPress={ () => navigation.navigate('Results') }
    />),
  headerStyle: { marginTop: Constants.statusBarHeight }
});

export default CategorySelectionScreen;
