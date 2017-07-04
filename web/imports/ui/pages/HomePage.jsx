import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Products } from '../../api/products/products.js';
import { Queries } from '../../api/queries/queries.js';

import QueryImageSelection from '../components/query-image-selection/QueryImageSelection.jsx';
import QueryResultsList from '../components/query-results-list/QueryResultsList.jsx';

class HomePage extends Component {
  getProductsSorted() {
    const currentQuery = this.props.currentQuery;
    const results = currentQuery ? currentQuery.results : [];
    const productsSorted = [];
    results.forEach(result =>  {
      const product = this.props.products.find((product) => {
        return product.id === result;
      });
      if (product) {
        productsSorted.push(product);
      }
    });
    return productsSorted;
  }

  render() {
    return (
      <div className="row">
        <QueryImageSelection
          currentQuery={this.props.currentQuery}
          queries={this.props.queries}
          onUpdateCurrentQuery={this.props.onUpdateCurrentQuery}
          onUpdateCurrentQueryCategory={this.props.onUpdateCurrentQueryCategory}
          onUpdateCurrentQueryResults={this.props.onUpdateCurrentQueryResults}
        />
        <QueryResultsList products={this.getProductsSorted()} />
      </div>
    );
  }
}

export default HomePageContainer = createContainer(({ currentQuery, onUpdateCurrentQuery, onUpdateCurrentQueryCategory, onUpdateCurrentQueryResults }) => {
  Meteor.subscribe('products.byCurrentQuery', currentQuery);

  return {
    currentQuery: currentQuery,
    queries: Queries.find().fetch(),
    onUpdateCurrentQuery: onUpdateCurrentQuery,
    onUpdateCurrentQueryCategory: onUpdateCurrentQueryCategory,
    onUpdateCurrentQueryResults: onUpdateCurrentQueryResults,
    products: Products.find().fetch()
  };
}, HomePage);
