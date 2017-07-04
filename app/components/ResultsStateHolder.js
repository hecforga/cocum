import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

import { getQuery, getResultsIds, getResultsIsFetching, getResultsErrorMessage } from '../reducers';
import { fetchResults } from '../actions';

import ResultsListWithData from './ResultsList.js';

class ResultsStateHolder extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { query, fetchResults } = this.props;
    fetchResults(query.gender, query.category, query.imageUrl);
  }

  render() {
    const { ids, isFetching, errorMessage } = this.props;

    if (isFetching) {
      return (
        <View style={styles.container}>
          <Text>Cargando...</Text>
        </View>
      );
    }

    if (errorMessage) {
      return (
        <View style={styles.container}>
          <Text>{errorMessage}</Text>
        </View>
      );
    }

    return (
      <View style={ styles.container }>
        <ResultsListWithData ids={ids} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state) => ({
  query: getQuery(state),
  ids: getResultsIds(state),
  isFetching: getResultsIsFetching(state),
  errorMessage: getResultsErrorMessage(state)
});

ResultsStateHolder = connect(
  mapStateToProps,
  {
    fetchResults
  }
)(ResultsStateHolder);

export default ResultsStateHolder;