import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, ScrollView, Image, Text, Dimensions } from 'react-native';

const CONTAINER_PADDING = 16;
const PRODUCT_THUMBNAIL_CONTAINER_MARGIN = 8;

class ResultsList extends Component {
  componentWillMount() {
    const { height, width } = Dimensions.get('window');
    this.imageWidth = (width - 2 * CONTAINER_PADDING - 4 * PRODUCT_THUMBNAIL_CONTAINER_MARGIN) / 2;
    this.imageWidth = this.imageWidth | 0;
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
              <TouchableHighlight
                key={product.productId}
                style={styles.productThumbnailContainer}
                onPress={() => onProductPress(product) }
              >
                <View style={styles.productThumbnail}>
                  <Image source={{ uri: product.imageUrl }} style={{ width: this.imageWidth, height: this.imageWidth * 1.2 }} />
                  <Text>{product.shop.toUpperCase()}</Text>
                  <Text style={styles.price}>{product.price + ' €'}</Text>
                </View>
              </TouchableHighlight>
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
  productThumbnailContainer: {
    margin: PRODUCT_THUMBNAIL_CONTAINER_MARGIN
  },
  productThumbnail: {
    backgroundColor: '#e8e8ee'
  },
  price: {
    fontWeight: 'bold'
  }
});

export default ResultsList;