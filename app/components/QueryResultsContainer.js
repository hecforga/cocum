import React, { Component } from 'react';
import { ImageEditor } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';

import { getSelectedImage, getQuery, getResultsIdsAtLevel, getResultsStatusAtLevel, getResultsErrorMessage, getAppliedFiltersAtLevel } from '../reducers';
import * as actions from '../actions';

import ResultsContainer from './ResultsContainer.js';

class QueryResultsContainer extends Component {
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
          this.fetchResults(nextProps.query, nextProps.appliedFilters, nextProps.ids);
          break;
      }
    }
  }

  cropImage() {
    const { tabName, selectedImage, cropImage } = this.props;
    cropImage(tabName, ImageEditor.cropImage, selectedImage.imageUri, selectedImage.cropData);
  }

  generateQueryId() {
    const { tabName, query, generateQueryId, createMyQueryMutate } = this.props;
    generateQueryId(tabName, createMyQueryMutate, query);
  }

  uploadImage(query) {
    const { tabName, uploadImage } = this.props;
    uploadImage(tabName, query.id, query.imageUri, query.category);
  }

  fetchResults(query, appliedFilters, ids) {
    const { tabName, fetchResults } = this.props;
    const params = { gender: query.gender, category: query.category, query, filters: appliedFilters, previousIds: ids };
    fetchResults(tabName, 'url', params);
  }

  render() {
    return (
      <ResultsContainer {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedImage: getSelectedImage(state),
  query: getQuery(state),
  ids: getResultsIdsAtLevel(state, ownProps.tabName, ownProps.level),
  status: getResultsStatusAtLevel(state, ownProps.tabName, ownProps.level),
  errorMessage: getResultsErrorMessage(state),
  appliedFilters: getAppliedFiltersAtLevel(state, ownProps.tabName, ownProps.level)
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
      id,
      rating
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
)(QueryResultsContainer);