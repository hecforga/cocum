import React, { Component } from 'react';

import { Queries } from '../../api/queries/queries.js';

import HomePageContainer from './HomePage.jsx';

export default class HomePageStateHolder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuery: null
    };

    this.onUpdateCurrentQuery = this.onUpdateCurrentQuery.bind(this);
    this.onUpdateCurrentQueryCategory = this.onUpdateCurrentQueryCategory.bind(this);
    this.onUpdateCurrentQueryResults = this.onUpdateCurrentQueryResults.bind(this);
  }

  setCurrentQuery(id) {
    const currentQuery = Queries.findOne(id);
    this.setState({
      currentQuery: currentQuery
    });
  }

  onUpdateCurrentQuery(_id) {
    if (this.state.currentQuery) {
      const previousQueryId = this.state.currentQuery._id;
      Queries.update(previousQueryId, {$set: {results: []}});
    }

    this.setCurrentQuery(_id);
  }

  onUpdateCurrentQueryCategory(category) {
    const currentQueryId = this.state.currentQuery._id;
    Queries.update(currentQueryId, { $set: {category: category } });

    this.setCurrentQuery(currentQueryId);
  }

  onUpdateCurrentQueryResults(results) {
    const currentQueryId = this.state.currentQuery._id;
    Queries.update(currentQueryId, { $set: {results: results } });

    this.setCurrentQuery(currentQueryId);
  }

  render() {
    return (
      <HomePageContainer
        currentQuery={this.state.currentQuery}
        onUpdateCurrentQuery={this.onUpdateCurrentQuery}
        onUpdateCurrentQueryCategory={this.onUpdateCurrentQueryCategory}
        onUpdateCurrentQueryResults={this.onUpdateCurrentQueryResults}
      />
    );
  }
}