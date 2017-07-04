import React from 'react';
import { Button } from 'react-native';
import { Constants } from 'expo';

import ImageSelectionStateHolder from './ImageSelectionStateHolder.js';

const ImageSelectionScreen = ({ navigation }) => (
  <ImageSelectionStateHolder />
);

ImageSelectionScreen.navigationOptions = ({ navigation }) => ({
  title: 'Selecciona una imagen',
  headerRight: (
    <Button
      title='Siguiente'
      onPress={ () => navigation.navigate('CategorySelection') }
    />),
  headerStyle: { marginTop: Constants.statusBarHeight }
});

export default ImageSelectionScreen;
