import React, { Component } from 'react';

import { Queries } from '../../api/queries/queries.js';

import HomePageContainer from './HomePage.jsx';

export default class HomePageStateHolder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuery: null
    };

    this.onNewQuery = this.onNewQuery.bind(this);
    this.onUpdateCurrentQueryResults = this.onUpdateCurrentQueryResults.bind(this);
  }

  onNewQuery(id, imageUrl) {
    const newQueryId = Queries.insert({
      id: id,
      imageUrl: imageUrl,
      results: []
    });

    const currentQuery = Queries.findOne(newQueryId);
    this.setState({
      currentQuery: currentQuery
    });
  }

  onUpdateCurrentQueryResults(results) {
    const currentQueryId= this.state.currentQuery._id;
    Queries.update(currentQueryId, {$set: {results: results}});

    const currentQuery = Queries.findOne(currentQueryId);
    this.setState({
      currentQuery: currentQuery
    });
  }

  render() {
    return (
      <HomePageContainer currentQuery={this.state.currentQuery} onNewQuery={this.onNewQuery} onUpdateCurrentQueryResults={this.onUpdateCurrentQueryResults} />
    );
  }
}