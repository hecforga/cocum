import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';

import { getResultsIdsAtLevel, getResultsStatusAtLevel, getResultsErrorMessage, getSelectedProductAtLevel, getAppliedFiltersAtLevel } from '../../reducers/index';
import * as actions from '../../actions/index';

import ResultsContainer from './ResultsContainer.js';

class CocumItResultsContainer extends Component {
  componentWillUpdate(nextProps) {
    if (this.props.status !== nextProps.status) {
      switch (nextProps.status) {
        case 'init':
        case 'filters_applied':
          this.fetchResults(nextProps.previousLevelSelectedProduct, nextProps.appliedFilters, nextProps.ids);
          break;
      }
    }
  }

  fetchResults(previousLevelSelectedProduct, appliedFilters, ids) {
    const { category, tabName, fetchResults } = this.props;
    const params = { gender: 'mujer', category, product: previousLevelSelectedProduct, filters: appliedFilters, previousIds: ids };
    fetchResults(tabName, 'id', params);
  }

  render() {
    return (
      <ResultsContainer {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  ids: getResultsIdsAtLevel(state, ownProps.tabName, ownProps.level),
  status: getResultsStatusAtLevel(state, ownProps.tabName, ownProps.level),
  errorMessage: getResultsErrorMessage(state, ownProps.tabName),
  appliedFilters: getAppliedFiltersAtLevel(state, ownProps.tabName, ownProps.level),
  previousLevelSelectedProduct: getSelectedProductAtLevel(state, ownProps.tabName, ownProps.level - 1)
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
    mapStateToProps,
    actions
  ),
  graphql(getProductsByIds),
  graphql(updateProductTimesVisited, { name: 'updateProductTimesVisitedMutate' })
)(CocumItResultsContainer);