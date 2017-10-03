import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';

import ProductThumbnail from '../common/ProductThumbnail.js';

const CONTAINER_PADDING = 16;
const PRODUCT_THUMBNAIL_CONTAINER_MARGIN = 8;

class ResultsList1 extends Component {
  componentWillMount() {
    const { height, width } = Dimensions.get('window');
    this.imageWidth = (width - 2 * CONTAINER_PADDING - 4 * PRODUCT_THUMBNAIL_CONTAINER_MARGIN) / 2;
  }

  render() {
    const { productsInArraysOf2, onProductPress } = this.props;

    return (
      <FlatList
        style={styles.container}
        data={productsInArraysOf2}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return (
            <View style={styles.listRow}>
              {item.map((product) =>
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
          );
        }}
        initialNumToRender={2}
      />
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

export default ResultsList1;