import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, ScrollView, Image, Text, Dimensions } from 'react-native';

import ProductThumbnail from '../common/ProductThumbnail.js';

const CONTAINER_PADDING = 16;
const PRODUCT_THUMBNAIL_CONTAINER_MARGIN = 8;

class ResultsList extends Component {
  componentWillMount() {
    const { height, width } = Dimensions.get('window');
    this.imageWidth = (width - 2 * CONTAINER_PADDING - 4 * PRODUCT_THUMBNAIL_CONTAINER_MARGIN) / 2;
  }

  render() {
    const { productsInArraysOf2, onProductPress } = this.props;

    return (
      <ScrollView style={styles.container}>
        {productsInArraysOf2.map((arrayOf2Products, index) =>
          <View
            key={index}
            style={styles.listRow}
          >
            {arrayOf2Products.map((product) =>
              <ProductThumbnail
                key={ product.productId}
                product={product}
                productThumbnailContainerStyle={{
                  margin: PRODUCT_THUMBNAIL_CONTAINER_MARGIN,
                  width: this.imageWidth
                }}
                onPress={onProductPress}
              />
            )}
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: CONTAINER_PADDING
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  productThumbnail: {
    backgroundColor: '#e8e8ee'
  },
  price: {
    fontWeight: 'bold'
  }
});

export default ResultsList;