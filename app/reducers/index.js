import * as fromSelectedImage from './selectedImage.js';
import * as fromQuery from './query.js';
import * as fromResults from './results.js';
import * as fromFilters from './filters.js';
import * as fromCanGoNext from './canGoNext.js';
import * as fromWebView from './webView.js';

export const getSelectedImage = (state) =>
  fromSelectedImage.getSelectedImage(state.selectedImage);

export const getQuery = (state) =>
  fromQuery.getQuery(state.query);

export const getResultsIdsAtLevel = (state, tabName, level) =>
  fromResults.getIdsAtLevel(state.results, tabName, level);

export const getResultsStatusAtLevel = (state, tabName, level) =>
  fromResults.getStatusAtLevel(state.results, tabName, level);

export const getResultsErrorMessage = (state, tabName) =>
  fromResults.getErrorMessage(state.results, tabName);

export const getResultsActiveLevel = (state, tabName) =>
  fromResults.getActiveLevel(state.results, tabName);

export const getCurrentFilters = (state) =>
  fromFilters.getCurrentFilters(state.filters);

export const areFiltersCleared = (state) =>
  fromFilters.areFiltersCleared(state.filters);

export const areFiltersValid = (state) =>
  fromFilters.areFiltersValid(state.filters);

export const getAppliedFiltersAtLevel = (state, tabName, level) =>
  fromFilters.getAppliedFiltersAtLevel(state.filters, tabName, level);

export const getCanGoNext = (state) =>
  fromCanGoNext.getCanGoNext(state.canGoNext);

export const getWebViewCanGoBack = (state) =>
  fromWebView.getCanGoBack(state.webView);

export const getWebViewCanGoForward = (state) =>
  fromWebView.getCanGoForward(state.webView);

export const getWebViewIsLoading = (state) =>
  fromWebView.getIsLoading(state.webView);