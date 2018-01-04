import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';

import { getResultsIdsAtLevel, getResultsStatusAtLevel, getResultsErrorMessage, getAppliedFiltersAtLevel } from '../../reducers';
import * as actions from '../../actions/index';

import ResultsContainer from './ResultsContainer.js';

class RandomResultsContainer extends Component {
  componentDidMount() {
    const { tabName, onRandomResultsDidMount } = this.props;

    onRandomResultsDidMount(tabName);
  }

  componentWillUpdate(nextProps) {
    if (this.props.status !== nextProps.status) {
      switch (nextProps.status) {
        case 'init':
        case 'retry':
        case 'filters_applied':
          this.computeResults(nextProps.appliedFilters);
          break;
      }
    }
  }

  componentWillUnmount() {
    const { tabName, onRandomResultsWillUnmount } = this.props;

    onRandomResultsWillUnmount(tabName);
  }

  computeResults(appliedFilters) {
    const { tabName, category, computeResults, computeResultsMutate } = this.props;

    computeResults(
      computeResultsMutate,
      tabName,
      'random',
      'mujer',
      category,
      '',
      '',
      {},
      appliedFilters
    );
  }

  render() {
    return (
      <ResultsContainer cocumItIsVisible={true} {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  ids: getResultsIdsAtLevel(state, ownProps.tabName, ownProps.level),
  status: getResultsStatusAtLevel(state, ownProps.tabName, ownProps.level),
  errorMessage: getResultsErrorMessage(state, ownProps.tabName),
  appliedFilters: getAppliedFiltersAtLevel(state, ownProps.tabName, ownProps.level),
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
)(RandomResultsContainer);