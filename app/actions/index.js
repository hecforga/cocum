import { RNS3 } from 'react-native-aws3';

import { accessKey, secretKey } from '../credentials/s3credentials.js';
import * as liresolr_api from '../liresolr_api';

export const selectImage = (imageUri, width, height) => ({
  type: 'SELECT_IMAGE',
  imageUri,
  width,
  height
});

export const setSelectedImageLayout = (layout) => ({
  type: 'SET_SELECTED_IMAGE_LAYOUT',
  layout
});

export const setSelectedImageCropData = (cropData) => ({
  type: 'SET_SELECTED_IMAGE_CROP_DATA',
  cropData
});

export const resetSelectedImage = () => ({
  type: 'RESET_SELECTED_IMAGE'
});

export const setQueryCategory = (category) => ({
  type: 'SET_QUERY_CATEGORY',
  category
});

export const resetQuery = () => ({
  type: 'RESET_QUERY'
});

export const cropImage = (tabName, cropImageMethod, uri, cropData) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    cropImageMethod(uri, cropData, resolve, reject);
  }).then(
    response => {
      dispatch({
        type: 'CROP_IMAGE_SUCCESS',
        tabName,
        imageUri: response
      });
    }
  ).catch(
    error => handleFetchResultsFailure(dispatch, tabName, error)
  );
};

export const generateQueryId = (tabName, mutate, query) => (dispatch, getState) => {
  mutate({
    variables: { gender: query.gender, category: query.category }
  }).then((response) => {
    dispatch({
      type: 'SET_QUERY_ID',
      tabName,
      id: response.data.createMyQuery.id
    });
  }).catch(
    error => handleFetchResultsFailure(dispatch, tabName, error)
  );
};

export const uploadImage = (tabName, queryId, imageUri, category) => (dispatch, getState) => {
  const file = {
    // `uri` can also be a file system path (i.e. file://)
    uri: imageUri,
    name: queryId+='.jpg',
    type: 'image/jpg'
  };

  const options = {
    keyPrefix: 'queryImages/'.concat(category).concat('/'),
    bucket: 'cocumapp',
    region: 'eu-central-1',
    accessKey: accessKey,
    secretKey: secretKey,
    successActionStatus: 201
  };

  return RNS3.put(file, options).then(
    response => {
      if (response.status !== 201) {
        throw new Error();
      }
      dispatch({
        type: 'UPLOAD_IMAGE_SUCCESS',
        tabName,
        imageUrl: response.body.postResponse.location
      });
    }
  ).catch(
    error => handleFetchResultsFailure(dispatch, tabName, error)
  );
};

export const fetchResults = (tabName, mode, params) => (dispatch, getState) => {
  dispatch({
    type: 'FETCH_RESULTS_REQUEST',
    tabName
  });

  return liresolr_api.fetchResults(mode, params).then(
    response => {
      const idsChanged = response.length !== params.previousIds.length ||
        response.filter((id) => params.previousIds.indexOf(id) < 0).length > 0;
      if (idsChanged) {
        dispatch({
          type: 'FETCH_RESULTS_SUCCESS',
          tabName,
          response
        });
      } else {
        dispatch({
          type: 'APOLLO_RESULTS_READY_MANUAL',
          tabName
        });
      }
    }
  ).catch(
    error => handleFetchResultsFailure(dispatch, tabName, error)
  );
};

const handleFetchResultsFailure = (dispatch, tabName, error) => {
  console.log(error);
  dispatch({
    type: 'FETCH_RESULTS_FAILURE',
    tabName,
    message: error.message  || 'Algo ha ido mal.'
  });
};

export const onResultsWillMount = (tabName) => ({
  type: 'ON_RESULTS_WILL_MOUNT',
  tabName
});

export const onResultsWillUnmount = (tabName) => ({
  type: 'ON_RESULTS_WILL_UNMOUNT',
  tabName
});

export const setProductTimesRedirected = (mutate, product) => (dispatch, getState) => {
  mutate({
    variables: { id: product.id, timesRedirected: product.timesRedirected + 1}
  }).catch(
    error => console.log(error)
  );
};

export const initCurrentFilters = (appliedFilters) => ({
  type: 'INIT_CURRENT_FILTERS',
  appliedFilters
});

export const setMinPriceFilter = (minPrice) => ({
  type: 'SET_MIN_PRICE_FILTER',
  minPrice
});

export const setMaxPriceFilter = (maxPrice) => ({
  type: 'SET_MAX_PRICE_FILTER',
  maxPrice
});

export const addShopFilter = (shop) => ({
  type: 'ADD_SHOP_FILTER',
  shop
});

export const removeShopFilter = (shop) => ({
  type: 'REMOVE_SHOP_FILTER',
  shop
});

export const clearFilters = () => ({
  type: 'CLEAR_FILTERS'
});

export const applyFilters = (filters, tabName) => ({
  type: 'APPLY_FILTERS',
  filters,
  tabName
});

export const setCanGoNext = (goNext) => ({
  type: 'SET_CAN_GO_NEXT',
  goNext
});

export const setWebViewCanGoBack = (canGoBack) => ({
  type: 'SET_WEB_VIEW_CAN_GO_BACK',
  canGoBack
});

export const setWebViewCanGoForward = (canGoForward) => ({
  type: 'SET_WEB_VIEW_CAN_GO_FORWARD',
  canGoForward
});

export const setWebViewIsLoading = (isLoading) => ({
  type: 'SET_WEB_VIEW_IS_LOADING',
  isLoading
});

export const resetWebView = () => ({
  type: 'RESET_WEB_VIEW'
});
