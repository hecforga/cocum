import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Image, Text } from 'react-native';

import * as fromProductsInfo from '../../utilities/productsInfo.js';

class ProductThumbnail extends Component {
  render() {
    const {
      product,
      productThumbnailContainerStyle,
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
            style={styles.image}
            resizeMode='cover'
          >
            {product.discounted ?
              <View style={{ position: 'absolute', top: 10, right: 0, backgroundColor: 'black' }}>
                <Text style={{ color: 'white', paddingLeft: 4, paddingRight: 4, fontSize: 12 }}>OFERTA</Text>
              </View>
              :
              null
            }
          </Image>
          <Text numberOfLines={1}>{fromProductsInfo.getShopOrBrandLabel(product)}</Text>
          <Text style={[styles.price, { color: product.discounted ? 'red' : 'black' }]}>{fromProductsInfo.getPriceLabel(product)}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  productThumbnail: {
    backgroundColor: '#e8e8ee'
  },
  image: {
    flex: 1,
    aspectRatio: 0.8,
    marginBottom: 8,
  },
  price: {
    fontWeight: 'bold'
  },
});

export default ProductThumbnail;