import React, { Component } from 'react';
import { ImageEditor } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';

import { getSelectedImage, getQuery, getResultsIdsAtLevel, getResultsStatusAtLevel, getResultsErrorMessage, getAppliedFiltersAtLevel } from '../../reducers';
import * as actions from '../../actions/index';

import ResultsContainer from './ResultsContainer.js';

class QueryResultsContainer extends Component {
  componentWillUpdate(nextProps) {
    if (this.props.status !== nextProps.status) {
      switch (nextProps.status) {
        case 'init':
        case 'retry':
          this.cropImage();
          break;
        case 'image_cropped':
          this.uploadCroppedImage(nextProps.selectedImage);
          break;
        case 'ready_to_compute_results':
        case 'filters_applied':
          this.computeResults(nextProps.query, nextProps.appliedFilters);
          break;
      }
    }
  }

  cropImage() {
    const { tabName, selectedImage, cropImage } = this.props;

    cropImage(tabName, ImageEditor.cropImage, selectedImage.fullImageUri, selectedImage.cropData);
  }

  uploadCroppedImage(selectedImage) {
    const { tabName, query, uploadCroppedImage } = this.props;

    uploadCroppedImage(tabName, query.id, selectedImage.croppedImageUri, query.category);
  }

  computeResults(query, appliedFilters) {
    const { tabName, computeResults, computeResultsMutate } = this.props;

    computeResults(
      computeResultsMutate,
      tabName,
      'url',
      query.gender,
      query.category,
      query.croppedImageUrl,
      '',
      query.tags,
      appliedFilters
    );
  }

  render() {
    return (
      <ResultsContainer 
        cocumItIsVisible={true} 
        webViewCaller={'ResultsUrl'}
        {...this.props} />
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
      displayImageUrl,
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

const computeResults = gql`
  mutation computeResults ($mode: String!, $gender: String!, $category: String!, $imageUrl: String!, $productId: String!, $tags: Json!, $filters: Json!) {
    computeResults(mode: $mode, gender: $gender, category: $category, imageUrl: $imageUrl, productId: $productId, tags: $tags, filters: $filters) {
      results
    }
  }
`;

const updateProductTimesRedirected = gql`
  mutation updateProductTimesRedirected ($id: ID!, $timesRedirected: Int!) {
    updateProduct(id: $id, timesRedirected: $timesRedirected) {
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
  graphql(computeResults, { name: 'computeResultsMutate' }),
  graphql(updateProductTimesRedirected, { name: 'updateProductTimesRedirectedMutate' })
)(QueryResultsContainer);