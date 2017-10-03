import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

import * as actions from '../../actions';
import { generateEventLabel } from '../../utilities/googleAnalytics.js';

import ProductsHorizontalList from '../common/ProductsHorizontalList.js';
import ProductDetailContainer from '../product_detail/ProductDetailContainer.js';

const CONTAINER_PADDING = 16;
const PRODUCT_THUMBNAIL_CONTAINER_MARGIN = 8;

class TrendingContainer extends Component {
  componentWillMount() {
    const { tabName, setCanGoNext, onResultsWillMount } = this.props;

    const { height, width } = Dimensions.get('window');
    this.imageWidth = (width - 2 * CONTAINER_PADDING - 4 * PRODUCT_THUMBNAIL_CONTAINER_MARGIN) / 2.25;

    setCanGoNext(true);
    onResultsWillMount(tabName);

    this.tracker = new GoogleAnalyticsTracker('UA-106460906-1');
  }

  componentWillUnmount() {
    const { tabName, onResultsWillUnmount } = this.props;
    onResultsWillUnmount(tabName);
  }

  render() {
    const {
      navigation,
      level,
      tabName,
      productsByTimesRedirected,
      productsByTimesVisited,
      productsByRandom,
      productsByUpdatedAt
    } = this.props;


    if (
      productsByTimesRedirected.loading === true ||
      productsByTimesVisited.loading === true ||
      productsByRandom.loading === true ||
      productsByUpdatedAt.loading === true
    ) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <ProductsHorizontalList
            title={'Lo más vendido'}
            onProductPress={(product) => this.onProductPress(product)}
            products={this.getProductsRedirected()}
            scrollbarStyle={styles.scrollbarStyle}
            productThumbnailContainerStyle={{ width: this.imageWidth }}
          />

          <ProductsHorizontalList
            title={'Lo más buscado'}
            onProductPress={(product) => this.onProductPress(product)}
            products={this.getProductsVisited()}
            scrollbarStyle={styles.scrollbarStyle}
            productThumbnailContainerStyle={{ width: this.imageWidth }}
          />

          <ProductsHorizontalList
            title={'Lo más nuevo'}
            onProductPress={(product) => this.onProductPress(product)}
            products={this.getProductsUpdated()}
            scrollbarStyle={styles.scrollbarStyle}
            productThumbnailContainerStyle={{ width: this.imageWidth }}
          />

          <ProductsHorizontalList
            title={'Te puede gustar'}
            onProductPress={(product) => this.onProductPress(product)}
            products={this.getProductsRandom()}
            scrollbarStyle={styles.scrollbarStyle}
            productThumbnailContainerStyle={{ width: this.imageWidth }}
          />
        </ScrollView>
        <ProductDetailContainer navigation={navigation} tabName={tabName} level={level} />
      </View>
    );
  }

  getProductsRedirected() {
    const { productsByTimesRedirected } = this.props;
    return productsByTimesRedirected.allProducts;
  }

  getProductsVisited() {
    const { productsByTimesVisited } = this.props;
    return productsByTimesVisited.allProducts;
  }

  getProductsUpdated() {
    const { productsByUpdatedAt } = this.props;
    return productsByUpdatedAt.allProducts;
  }

  getProductsRandom() {
    const { productsByRandom } = this.props;
    return productsByRandom.allProducts;
  }

  onProductPress(product) {
    const { tabName, setSelectedProduct, setProductTimesVisited, updateProductTimesVisitedMutate } = this.props;

    const labelData = {
      tabName: tabName,
      initial: true,
      category: product.category,
      shop: product.shop
    };
    this.tracker.trackEvent('product', 'pressed', { label: generateEventLabel(labelData) } );

    setSelectedProduct(tabName, product);
    setProductTimesVisited(updateProductTimesVisitedMutate, product);
  }
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  scrollbarStyle: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10
  }
});

const getProductsByTimesRedirected = gql`
  query getProductsByTimesRedirected {
    allProducts(orderBy: timesRedirected_DESC, first:5) {
      id,
      productId,
      productImageUrl,
      modelImageUrl,
      productUrl,
      affiliateUrl,
      price,
      shop,
      brand,
      category,
      timesVisited,
      timesRedirected
    }
  }
`;

const getProductsByTimesVisited = gql`
  query getProductsByTimesVisited {
    allProducts(orderBy: timesVisited_DESC, first:5) {
      id,
      productId,
      productImageUrl,
      modelImageUrl,
      productUrl,
      affiliateUrl,
      price,
      shop,
      brand,
      category,
      timesVisited,
      timesRedirected
    }
  }
`;

const getProductsByUpdatedAt = gql`
  query getProductsByUpdatedAt {
    allProducts(
    orderBy: updatedAt_DESC,
    first:5,
    filter: {
      shop_not_in: ["zara", "mango","pullandbear"]
    }) {
      id,
      productId,
      productImageUrl,
      modelImageUrl,
      productUrl,
      affiliateUrl,
      price,
      shop,
      brand,
      category,
      timesVisited,
      timesRedirected
    }
  }
`;

const getProductsByRandom = gql`
  query getProductsByRandom {
    allProducts(
    first:5, 
    skip:5, 
    orderBy: updatedAt_DESC,        
    filter: {
     shop_not_in: ["zara", "mango","pullandbear"]
    }) {
      id,
      productId,
      productImageUrl,
      modelImageUrl,
      productUrl,
      affiliateUrl,
      price,
      shop,
      brand,
      category,
      timesVisited,
      timesRedirected
    }
  }
`;

const updateProductTimesVisited = gql`
  mutation updateProductTimesVisited ($id: ID!, $timesVisited: Int!) {
    updateProduct(id: $id, timesVisited: $timesVisited ) {
      id
    }
  }
`;

export default compose(
  connect(
    null,
    actions
  ),
  graphql(getProductsByTimesRedirected, { name : 'productsByTimesRedirected' }),
  graphql(getProductsByTimesVisited, { name : 'productsByTimesVisited' }),
  graphql(getProductsByRandom, { name : 'productsByRandom' }),
  graphql(getProductsByUpdatedAt, { name : 'productsByUpdatedAt' }),
  graphql(updateProductTimesVisited, { name: 'updateProductTimesVisitedMutate' })
)(TrendingContainer);