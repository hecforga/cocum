import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

import { generateEventLabel } from '../../utilities/googleAnalytics.js';

import NoResultsMessage from './NoResultsMessage.js';
import ResultsHeader from './ResultsHeader.js';
import ResultsList from './ResultsList.js';
import * as fromProductsInfo from '../../utilities/productsInfo.js';

class ResultsContainer extends Component {
  componentWillMount() {
    const { tabName, setCanGoNext, onResultsWillMount } = this.props;
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
      tabName,
      level,
      status,
      errorMessage,
      cocumItIsVisible,
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
            cocumItIsVisible={cocumItIsVisible}
            onProductPress={(product) => this.onProductPress(product)}
            onCocumItPress={(product) => this.onCocumItPress(product)}
          />
          :
          <View style={styles.centeredContainer}>
            <NoResultsMessage/>
          </View>
        }
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
    const { navigation, tabName, setProductTimesRedirected, updateProductTimesRedirectedMutate } = this.props;

    const labelData = {
      tabName: tabName,
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

  onCocumItPress(product) {
    const { navigation, tabName, level } = this.props;

    const labelData = {
      tabName: tabName,
      category: product.category,
      shop: product.shop
    };
    this.tracker.trackEvent('button_cocumIt', 'pressed', { label: generateEventLabel(labelData) } );

    navigation.navigate('Results', {
      productId: product.productId,
      category: product.category,
      tabName: tabName,
      fetchMode: 'id',
      level: level + 1
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
  }
});

export default ResultsContainer