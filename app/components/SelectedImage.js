import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const SelectedImage = ({ imageUrl }) => (
  <View style={ styles.container }>
    <Image
      source={ {uri : imageUrl} }
      resizeMode={'contain'}
      style={ styles.image }
    />
  </View>
);

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