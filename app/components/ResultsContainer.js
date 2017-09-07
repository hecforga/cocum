import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageEditor, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';

import { getSelectedImage, getQuery, getResultsIdsAtLevel, getResultsStatusAtLevel, getResultsErrorMessage, getAppliedFiltersAtLevel } from '../reducers';
import * as actions from '../actions';

import NoResultsMessage from './results/NoResultsMessage.js';
import ResultsHeader from './results/ResultsHeader.js';
import ResultsList from './ResultsList.js';
import ProductDetailContainer from './product_detail/ProductDetailContainer.js';
import ResultsRatingBarContainerWithDataAndState from './results_rating/ResultsRatingBarContainer.js';//para la beta

class ResultsContainer extends Component {
  componentWillMount() {
    const { setCanGoNext, onResultsWillMount } = this.props;
    setCanGoNext(true);
    onResultsWillMount();
  }

  componentWillUpdate(nextProps) {
    if (this.props.status !== nextProps.status) {
      switch (nextProps.status) {
        case 'init':
          this.cropImage();
          break;
        case 'image_cropped':
          this.generateQueryId();
          break;
        case 'id_generated':
          this.uploadImage(nextProps.query);
          break;
        case 'image_uploaded':
        case 'filters_applied':
          this.fetchResults(nextProps.query, nextProps.appliedFilters);
          break;
        //para la beta
        case 'apollo_results_ready':
          this.setQueryResultsList(nextProps.ids, nextProps.data);
          break;//beta
      }
    }
  }

  componentWillUnmount() {
    const { onResultsWillUnmount } = this.props;
    onResultsWillUnmount();
  }

  cropImage() {
    const { selectedImage, cropImage } = this.props;
    cropImage(ImageEditor.cropImage, selectedImage.imageUri, selectedImage.cropData);
  }

  generateQueryId() {
    const { query, generateQueryId, createMyQueryMutate } = this.props;
    generateQueryId(createMyQueryMutate, query);
  }

  uploadImage(query) {
    const { uploadImage } = this.props;
    uploadImage(query.id, query.imageUri, query.category);
  }

  fetchResults(query, appliedFilters) {
    const { fetchResults } = this.props;
    const params = { query, filters: appliedFilters };
    fetchResults('url', params);
  }

  //para la beta
  setQueryResultsList(ids, data) {
    const { setQueryResultsList } = this.props;

    const resultsList = this.getProducts(ids, data).map((product) => product.productUrl);
    setQueryResultsList(resultsList);
  }//beta

  render() {
    const {
      navigation,
      level,
      status,
      errorMessage,
      setSelectedProduct,
      upd
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
        <ResultsRatingBarContainerWithDataAndState />
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

  getProducts(ids, data) {
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
    const { ids, data } = this.props;

    const products = this.getProducts(ids, data);
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
  appliedFilters: getAppliedFiltersAtLevel(state, ownProps.level)
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

const createMyQuery = gql`
  mutation createMyQuery ($gender: String!, $category: String!) {
    createMyQuery(gender: $gender, category: $category ) {
      id
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
  graphql(createMyQuery, { name: 'createMyQueryMutate' }),
  graphql(updateProductTimesVisited, { name: 'updateProductTimesVisitedMutate' })
)(ResultsContainer);