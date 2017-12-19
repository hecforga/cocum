import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

import * as actions from '../../actions';
import { generateEventLabel } from '../../utilities/googleAnalytics.js';

import ProductsHorizontalList from '../common/ProductsHorizontalList.js';
import * as fromProductsInfo from '../../utilities/productsInfo.js';

const CONTAINER_PADDING = 16;
const PRODUCT_THUMBNAIL_CONTAINER_MARGIN = 8;

class TrendingContainer extends Component {
  componentWillMount() {
    const { tabName, setCanGoNext, onResultsWillMount } = this.props;

    const { height, width } = Dimensions.get('window');
    this.imageWidth = 0.60*width;
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
      productsByUpdatedAtSkip,
      productsByUpdatedAt
    } = this.props;


    if (
      productsByTimesRedirected.loading === true ||
      productsByTimesVisited.loading === true ||
      productsByUpdatedAtSkip.loading === true ||
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
            products={this.getProductsUpdatedSkip()}
            scrollbarStyle={styles.scrollbarStyle}
            productThumbnailContainerStyle={{ width: this.imageWidth }}
          />
        </ScrollView>
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

  getProductsUpdatedSkip() {
    const { productsByUpdatedAtSkip } = this.props;
    return productsByUpdatedAtSkip.allProducts;
  }
  
  onProductPress(product) {
    const { navigation, tabName, setProductTimesRedirected, updateProductTimesRedirectedMutate } = this.props;

    const labelData = {
      tabName: tabName,
      initial: true,
      category: product.category,
      shop: product.shop
    };
    this.tracker.trackEvent('button_visitShop', 'pressed', { label: generateEventLabel(labelData) } );

    setProductTimesRedirected(updateProductTimesRedirectedMutate, product);

    const url = fromProductsInfo.getProductUrl(product);
    const domain = fromProductsInfo.getShopDomain(product);

    navigation.navigate('WebView', {
      url,
      domain
    });
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

const aWeekAgo = new Date(new Date().getTime() - 604800000).toISOString();
const excludedShops = ['zara', 'mango'];

const getProductsByTimesRedirected = gql`
  query getProductsByTimesRedirected {
    allProducts(
    orderBy: timesRedirected_DESC,
    first:5,
    filter: {
      updatedAt_gte: "${aWeekAgo}"
    }) {
      id,
      productId,
      productImageUrl,
      modelImageUrl,
      productUrl,
      affiliateUrl,
      price,
      discounted,
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
    allProducts(
    orderBy: timesVisited_DESC,
    first:5,
    filter: {
      updatedAt_gte: "${aWeekAgo}"
    }) {
      id,
      productId,
      productImageUrl,
      modelImageUrl,
      productUrl,
      affiliateUrl,
      price,
      discounted,
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
      shop_not_in: ["${excludedShops.join(`", "`)}"]
    }) {
      id,
      productId,
      productImageUrl,
      modelImageUrl,
      productUrl,
      affiliateUrl,
      price,
      discounted,
      shop,
      brand,
      category,
      timesVisited,
      timesRedirected
    }
  }
`;

const getProductsByUpdatedAtSkip = gql`
  query getProductsByUpdatedAtSkip {
    allProducts(
    first:5, 
    skip:5, 
    orderBy: updatedAt_DESC,        
    filter: {
     shop_not_in: ["${excludedShops.join(`", "`)}"]
    }) {
      id,
      productId,
      productImageUrl,
      modelImageUrl,
      productUrl,
      affiliateUrl,
      price,
      discounted,
      shop,
      brand,
      category,
      timesVisited,
      timesRedirected
    }
  }
`;

const updateProductTimesRedirected = gql`
  mutation updateProductTimesVisited ($id: ID!, $timesVisited: Int!) {
    updateProduct(id: $id, timesVisited: $timesVisited) {
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
  graphql(getProductsByUpdatedAtSkip, { name : 'productsByUpdatedAtSkip' }),
  graphql(getProductsByUpdatedAt, { name : 'productsByUpdatedAt' }),
  graphql(updateProductTimesRedirected, { name: 'updateProductTimesRedirectedMutate' })
)(TrendingContainer);