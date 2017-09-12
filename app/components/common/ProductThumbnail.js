import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Image, Text } from 'react-native';

import * as fromProductsInfo from '../../utilities/productsInfo.js';

class ProductThumbnail extends Component {
  render() {
    const {
      product,
      productThumbnailContainerStyle,
      imageStyle,
      onPress,
    } = this.props;

    return (
      <TouchableHighlight
        style={productThumbnailContainerStyle}
        onPress={() => onPress(product) }
      >
        <View style={styles.productThumbnail}>
          <Image
            source={{ uri: fromProductsInfo.getModelImageUrl(product) }}
            style={[styles.image, imageStyle]}
          />
          <Text>{fromProductsInfo.getShopAndBrandLabel(product)}</Text>
          <Text style={styles.price}>{fromProductsInfo.getPriceLabel(product)}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  productThumbnail: {
    backgroundColor: '#e8e8ee'
  },
  image:{
    width:50,
    height:60,
    marginBottom:8,
  },
  price: {
    fontWeight: 'bold'
  },
});

export default ProductThumbnail;