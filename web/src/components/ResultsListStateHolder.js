import React from 'react';
import { connect } from 'react-redux';

import { getResults } from '../reducers';
import { setQueryProductId } from '../actions';

import ResultsListWithData from './ResultsList.js';

let ResultsListStateHolder = ({ results, setQueryProductId }) => (
  <div>
    {results ? <ResultsListWithData
      results={results}
      setQueryProductId={setQueryProductId}
    /> : null}
  </div>
);

const mapStateToProps = (state) => ({
  results: getResults(state)
});

ResultsListStateHolder = connect(
  mapStateToProps,
  {
    setQueryProductId
  }
)(ResultsListStateHolder);

export default ResultsListStateHolder;