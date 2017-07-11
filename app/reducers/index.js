import * as fromSelectedImage from './selectedImage.js';
import * as fromQuery from './query.js';
import * as fromResults from './results.js';
import * as fromCanGoNext from './canGoNext.js';

export const getSelectedImage = (state) =>
  fromSelectedImage.getSelectedImage(state.selectedImage);

export const getQuery = (state) =>
  fromQuery.getQuery(state.query);

export const getResultsIds = (state) =>
  fromResults.getIds(state.results);

export const getResultsStatus = (state) =>
  fromResults.getStatus(state.results);

export const getResultsErrorMessage = (state) =>
  fromResults.getErrorMessage(state.results);

export const getCanGoNext = (state) =>
  fromCanGoNext.getCanGoNext(state.canGoNext);