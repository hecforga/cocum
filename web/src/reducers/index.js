import * as fromQuery from './query.js';
import * as fromResults from './results.js';

export const getQuery = (state) =>
  fromQuery.getQuery(state.query);

export const getResults = (state) =>
  fromResults.getResults(state.results);