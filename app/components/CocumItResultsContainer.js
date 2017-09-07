import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';

import { getSelectedImage, getQuery, getResultsIdsAtLevel, getResultsStatusAtLevel, getResultsErrorMessage, getSelectedProductAtLevel, getAppliedFiltersAtLevel } from '../reducers';
import * as actions from '../actions';

import NoResultsMessage from './results/NoResultsMessage.js';
import ResultsHeader from './results/ResultsHeader.js';
import ResultsList from './ResultsList.js';
import ProductDetailContainer from './product_detail/ProductDetailContainer.js';

class CocumItResultsContainer extends Component {
  componentWillMount() {
    const { setCanGoNext, onResultsWillMount } = this.props;
    setCanGoNext(true);
    onResultsWillMount();
  }

  componentWillUpdate(nextProps) {
    if (this.props.status !== nextProps.status) {
      switch (nextProps.status) {
        case 'init':
        case 'filters_applied':
          this.fetchResults(nextProps.query, nextProps.previousLevelSelectedProduct, nextProps.appliedFilters);
          break;
      }
    }
  }

  componentWillUnmount() {
    const { onResultsWillUnmount } = this.props;
    onResultsWillUnmount();
  }

  fetchResults(query, previousLevelSelectedProduct, appliedFilters) {
    const { fetchResults } = this.props;
    const params = { query, product: previousLevelSelectedProduct, filters: appliedFilters };
    fetchResults('id', params);
  }

  render() {
    const {
      navigation,
      level,
      status,
      errorMessage,
      setSelectedProduct,
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
        <ResultsHeader navigation={navigation} level={level} />
        {productsInArraysOf2.length ?
          <ResultsList
            productsInArraysOf2={productsInArraysOf2}
            setSelectedProduct={setSelectedProduct}
            onProductPress={(product) => this.onProductPress(product)}
          />
          :
          <View style={styles.centeredContainer}>
            <NoResultsMessage />
          </View>
        }
        <ProductDetailContainer navigation={navigation} level={level} />
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
    const { setSelectedProduct, setProductTimesVisited, updateProductTimesVisitedMutate } = this.props;

    setSelectedProduct(product);
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

const mapStateToProps = (state, ownProps) => ({
  selectedImage: getSelectedImage(state),
  query: getQuery(state),
  ids: getResultsIdsAtLevel(state, ownProps.level),
  status: getResultsStatusAtLevel(state, ownProps.level),
  errorMessage: getResultsErrorMessage(state),
  appliedFilters: getAppliedFiltersAtLevel(state, ownProps.level),
  previousLevelSelectedProduct: getSelectedProductAtLevel(state, ownProps.level - 1)
});

const getProductsByIds = gql`
  query getProductsByIds($ids: [String!]) {
    allProducts(filter: {
      productId_in: $ids
    }) {
      id,
      productId,
      imageUrl,
      productUrl,
      price,
      shop,
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
    mapStateToProps,
    actions
  ),
  graphql(getProductsByIds),
  graphql(updateProductTimesVisited, { name: 'updateProductTimesVisitedMutate' })
)(CocumItResultsContainer);