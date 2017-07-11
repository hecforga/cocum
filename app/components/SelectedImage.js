import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import CropRectangle from './CropRectangle.js';

const SelectedImage = ({ selectedImage, category, onSelectedImageLayoutComputed, setSelectedImageCropData }) => (
  <View style={ styles.container }>
    <Image
      source={ {uri : selectedImage.imageUri} }
      onLayout={(e) => computeSelectedImageLayout(e.nativeEvent.layout, selectedImage.originalWidth, selectedImage.originalHeight, onSelectedImageLayoutComputed)}
      resizeMode={'contain'}
      style={ styles.image }
    >
      {category ?
        <CropRectangle imageLayout={selectedImage.layout} onPanResponderEnd={setSelectedImageCropData}/>
        :
        <View style={styles.opacityContainer}>
          <Text style={styles.opacityText}>Selecciona una categoría</Text>
        </View>
      }
    </Image>
  </View>
);

const computeSelectedImageLayout = (containerLayout, originalWidth, originalHeight, onSelectedImageLayoutComputed) => {
  const containerAspectRatio = containerLayout.width / containerLayout.height;
  const imageAspectRatio = originalWidth / originalHeight;

  let x = containerLayout.x;
  let y = containerLayout.y;
  let width = containerLayout.width;
  let height = containerLayout.height;
  if (imageAspectRatio < containerAspectRatio) {
    width = height * imageAspectRatio;
    x += (containerLayout.width - width) / 2;
  } else {
    height = width / imageAspectRatio;
    y += (containerLayout.height - height) / 2;
  }

  onSelectedImageLayoutComputed({x, y, width, height});
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 4
  },
  image: {
    flex: 1
  },
  opacityContainer: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  opacityText: {
    fontSize: 16,
    color: 'white'
  }
});

export default SelectedImage;