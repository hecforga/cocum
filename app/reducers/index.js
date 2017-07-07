import * as fromSelectedImage from './selectedImage.js';
import * as fromQuery from './query.js';
import * as fromResults from './results.js';

export const getSelectedImage = (state) =>
  fromSelectedImage.getSelectedImage(state.selectedImage);

export const getQuery = (state) =>
  fromQuery.getQuery(state.query);

export const getResultsIds = (state) =>
  fromResults.getIds(state.results);

export const getResultsIsFetching = (state) =>
  fromResults.getIsFetching(state.results);

export const getResultsErrorMessage = (state) =>
  fromResults.getErrorMessage(state.results);