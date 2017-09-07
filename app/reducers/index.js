import * as fromSelectedImage from './selectedImage.js';
import * as fromQuery from './query.js';
import * as fromResults from './results.js';
import * as fromSelectedProducts from './selectedProducts.js';
import * as fromFilters from './filters.js';
import * as fromCanGoNext from './canGoNext.js';
import * as fromRatingBarState from './ratingBarState.js'; //para la beta

export const getSelectedImage = (state) =>
  fromSelectedImage.getSelectedImage(state.selectedImage);

export const getQuery = (state) =>
  fromQuery.getQuery(state.query);

export const getResultsIdsAtLevel = (state, level) =>
  fromResults.getIdsAtLevel(state.results, level);

export const getResultsStatusAtLevel = (state, level) =>
  fromResults.getStatusAtLevel(state.results, level);

export const getResultsErrorMessage = (state) =>
  fromResults.getErrorMessage(state.results);

export const getResultsActiveLevel = (state) =>
  fromResults.getActiveLevel(state.results);

export const getSelectedProductAtLevel = (state, level) =>
  fromSelectedProducts.getSelectedProductAtLevel(state.selectedProducts, level);

export const getCurrentFilters = (state) =>
  fromFilters.getCurrentFilters(state.filters);

export const areFiltersCleared = (state) =>
  fromFilters.areFiltersCleared(state.filters);

export const areFiltersValid = (state) =>
  fromFilters.areFiltersValid(state.filters);

export const getAppliedFiltersAtLevel = (state, level) =>
  fromFilters.getAppliedFiltersAtLevel(state.filters, level);

export const getCanGoNext = (state) =>
  fromCanGoNext.getCanGoNext(state.canGoNext);

//para la beta
export const getRatingBarState = (state) => 
  fromRatingBarState.getRatingBarState(state.ratingBarState);
