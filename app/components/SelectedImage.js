import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import CropRectangle from './CropRectangle.js';

const SelectedImage = ({ selectedImage, onSelectedImageLayoutComputed, setSelectedImageCropData }) => (
  <View style={ styles.container }>
    <Image
      source={ {uri : selectedImage.imageUri} }
      onLayout={(e) => computeSelectedImageLayout(e.nativeEvent.layout, selectedImage.originalWidth, selectedImage.originalHeight, onSelectedImageLayoutComputed)}
      resizeMode={'contain'}
      style={ styles.image }
    >
      <CropRectangle imageLayout={selectedImage.layout} onPanResponderEnd={setSelectedImageCropData} />
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
    width = imageAspectRatio * height;
    x += (containerLayout.width - width) / 2;
  } else {
    height = imageAspectRatio * width;
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
  }
});

export default SelectedImage;