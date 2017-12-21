import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';

import { getResultsIdsAtLevel, getResultsStatusAtLevel, getResultsErrorMessage, getAppliedFiltersAtLevel, getCocumItProductId, getCocumItTags } from '../../reducers';
import * as actions from '../../actions/index';

import ResultsContainer from './ResultsContainer.js';

class CocumItResultsContainer extends Component {
  componentWillUpdate(nextProps) {
    if (this.props.status !== nextProps.status) {
      switch (nextProps.status) {
        case 'init':
        case 'retry':
          this.getProductTags();
          break;
        case 'product_tags_got':
        case 'filters_applied':
          this.computeResults(nextProps.cocumItTags, nextProps.appliedFilters);
          break;
      }
    }
  }

  componentWillUnmount() {
    const { onCocumItResultsWillUnmount } = this.props;

    onCocumItResultsWillUnmount();
  }

  getProductTags() {
    const { tabName, category, cocumItProductId, getProductTags, getProductTagsMutate } = this.props;

    getProductTags(
      getProductTagsMutate,
      tabName,
      'mujer',
      category,
      cocumItProductId);
  }

  computeResults(cocumItTags, appliedFilters) {
    const { tabName, category, cocumItProductId, computeResults, computeResultsMutate } = this.props;

    computeResults(
      computeResultsMutate,
      tabName,
      'id',
      'mujer',
      category,
      '',
      cocumItProductId,
      cocumItTags,
      appliedFilters
    );
  }

  render() {
    return (
      <ResultsContainer cocumItIsVisible={false} {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  ids: getResultsIdsAtLevel(state, ownProps.tabName, ownProps.level),
  status: getResultsStatusAtLevel(state, ownProps.tabName, ownProps.level),
  errorMessage: getResultsErrorMessage(state, ownProps.tabName),
  appliedFilters: getAppliedFiltersAtLevel(state, ownProps.tabName, ownProps.level),
  cocumItProductId: getCocumItProductId(state),
  cocumItTags: getCocumItTags(state)
});

const getProductsByIds = gql`
  query getProductsByIds($ids: [String!]) {
    allProducts(filter: {
      productId_in: $ids
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

const getProductTags = gql`
  mutation getProductTags ($gender: String!, $category: String!, $productId: String!) {
    getProductTags(gender: $gender, category: $category, productId: $productId) {
      tags
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
  graphql(getProductTags, { name: 'getProductTagsMutate' }),
  graphql(computeResults, { name: 'computeResultsMutate' }),
  graphql(updateProductTimesRedirected, { name: 'updateProductTimesRedirectedMutate' })
)(CocumItResultsContainer);