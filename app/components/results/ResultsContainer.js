import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import DeviceInfo from 'react-native-device-info';
import firebase from 'react-native-firebase';

import { generateEventLabel } from '../../utilities/googleAnalytics.js';

import NoResultsMessage from './NoResultsMessage.js';
import ResultsHeader from './ResultsHeader.js';
import ResultsList from './ResultsList.js';
import ProductDetailContainer from '../product_detail/ProductDetailContainer.js';

class ResultsContainer extends Component {
  componentWillMount() {
    const { tabName, setCanGoNext, onResultsWillMount } = this.props;
    setCanGoNext(true);
    onResultsWillMount(tabName);

    this.buildNumber = parseInt(DeviceInfo.getBuildNumber());

    // react-native-google-analytics_bridge
    this.tracker = new GoogleAnalyticsTracker('UA-106460906-1');
  }

  componentWillUnmount() {
    const { tabName, onResultsWillUnmount } = this.props;
    onResultsWillUnmount(tabName);
  }

  render() {
    const {
      navigation,
      tabName,
      level,
      status,
      errorMessage,
    } = this.props;

    if (status === 'error') {
      return (
        <View style={styles.centeredContainer}>
          <Text>{errorMessage}</Text>
        </View>
      );
    }

    if (status !== 'apollo_results_ready') {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    const productsInArraysOf2 = this.getProductsInArraysOf2();

    return (
      <View style={styles.container}>
        <ResultsHeader navigation={navigation} tabName={tabName} level={level}/>
        {productsInArraysOf2.length ?
          <ResultsList
            productsInArraysOf2={productsInArraysOf2}
            onProductPress={(product) => this.onProductPress(product)}
          />
          :
          <View style={styles.centeredContainer}>
            <NoResultsMessage/>
          </View>
        }
        <ProductDetailContainer navigation={navigation} tabName={tabName} level={level}/>
      </View>
    );
  }

  getProducts() {
    const { ids, data } = this.props;

    const products = [];
    ids.forEach((id) => {
      const product = data.allProducts.find((p) => p.productId === id);
      if (!product) {
        return;
      }
      products.push(product);
    });

    return products;
  }

  getProductsInArraysOf2() {
    const products = this.getProducts();

    const productsInArraysOf2 = [];
    let aux = [];
    let count = 0;
    products.forEach((product) => {
      aux.push(product);
      if (count % 2 === 1) {
        productsInArraysOf2.push(aux);
        aux = [];
      }
      count++;
    });

    return productsInArraysOf2;
  }

  onProductPress(product) {
    const { tabName, setSelectedProduct, setProductTimesVisited, updateProductTimesVisitedMutate } = this.props;

    const eventParams = {
      tabName: tabName,
      category: product.category,
      shop: product.shop
    };
    if (this.buildNumber >= 8) {
      firebase.analytics().logEvent('product_pressed', eventParams);
    }

    // react-native-google-analytics_bridge
    this.tracker.trackEvent('product', 'pressed', { label: generateEventLabel(eventParams) } );

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
  }
});

export default ResultsContainer