import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Image, Text } from 'react-native';

import * as fromProductsInfo from '../../utilities/productsInfo.js';
import MyButton from './MyButton.js';

class ProductThumbnail extends Component {
  render() {
    const {
      product,
      productThumbnailContainerStyle,
      cocumItIsVisible,
      onPress,
      onCocumItPress,
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
          <View style={styles.priceAndButtonContainerStyle}>
            <Text style={[styles.price, { color: product.discounted ? 'red' : 'black'}]}>{fromProductsInfo.getPriceLabel(product)}</Text>
            {cocumItIsVisible ?
              <MyButton
                iconName='search'
                iconColor='black'
                iconFamily='MaterialIcons'
                iconStyle={{fontSize: 24}}
                buttonStyle={{backgroundColor: 'transparent', borderRadius: 0}}
                onPress={() => onCocumItPress(product) }
              />
              :
              <View/>
            }
          </View>
          <Text numberOfLines={1}>{fromProductsInfo.getShopOrBrandLabel(product)}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  productThumbnail: {
    backgroundColor: 'white'
  },
  priceAndButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    minHeight: 30
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  image: {
    flex: 1,
    aspectRatio: 0.8,
    marginBottom: 10,
  },
});

export default ProductThumbnail;