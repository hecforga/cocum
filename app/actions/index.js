import * as liresolr_api from '../liresolr_api';
import { RNS3 } from 'react-native-aws3';

import {accessKey, secretKey} from '../credentials/s3credentials.js';

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

//para la beta
export const setQueryRating = (mutate) => (dispatch, getState) => {
  mutate().catch(
    error => console.log(error)
  );
};

export const setQueryResultsList = (resultsProductUrl) => ({
  type: 'SET_QUERY_RESULTSLIST',
  resultsProductUrl
});

export const setGivenRating = (givenRating) => ({
  type: 'SET_GIVEN_RATING',
  givenRating
});

export const resetRatingBarState = () => ({
  type: 'RESET_RATINGBAR_STATE'
});

export const setRatingBarVisibility = (isVisible) => ({
  type: 'SET_RATINGBAR_VISIBILITY',
  isVisible
});// beta

export const resetQuery = () => ({
  type: 'RESET_QUERY'
});

export const cropImage = (cropImageMethod, uri, cropData) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    cropImageMethod(uri, cropData, resolve, reject);
  }).then(
    response => {
      dispatch({
        type: 'CROP_IMAGE_SUCCESS',
        imageUri: response
      });
    }
  ).catch(
    error => handleFetchResultsFailure(dispatch, error)
  );
};

export const generateQueryId = (mutate, query) => (dispatch, getState) => {
  mutate({
    variables: { gender: query.gender, category: query.category }
  }).then((response) => {
    dispatch({
      type: 'SET_QUERY_ID',
      id: response.data.createMyQuery.id
    })
  }).catch(
    error => handleFetchResultsFailure(dispatch, error)
  );
};

export const uploadImage = (queryId, imageUri, category) => (dispatch, getState) => {
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
        imageUrl: response.body.postResponse.location
      });
    }
  ).catch(
    error => handleFetchResultsFailure(dispatch, error)
  );
};

export const fetchResults = (mode, params) => (dispatch, getState) => {
  dispatch({
    type: 'FETCH_RESULTS_REQUEST',
  });

  let liresolrFunction = liresolr_api.fetchResultsWithUrl;
  if (mode === 'id') {
    liresolrFunction = liresolr_api.fetchResultsWithId;
  }

  return liresolrFunction(params).then(
    response => {
      dispatch({
        type: 'FETCH_RESULTS_SUCCESS',
        response
      });
    }
  ).catch(
    error => handleFetchResultsFailure(dispatch, error)
  );
};

const handleFetchResultsFailure = (dispatch, error) => {
  console.log(error);
  dispatch({
    type: 'FETCH_RESULTS_FAILURE',
    message: error.message  || 'Algo ha ido mal.'
  });
};

export const onResultsWillMount = () => ({
  type: 'ON_RESULTS_WILL_MOUNT'
});

export const onResultsWillUnmount = () => ({
  type: 'ON_RESULTS_WILL_UNMOUNT'
});

export const setSelectedProduct = (product) => ({
  type: 'SET_SELECTED_PRODUCT',
  product
});

export const setProductTimesVisited = (mutate, product) => (dispatch, getState) => {
  mutate({
    variables: { id: product.id, timesVisited: product.timesVisited + 1}
  }).catch(
    error => console.log(error)
  );
};

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

export const applyFilters = (filters) => ({
  type: 'APPLY_FILTERS',
  filters
});

export const setCanGoNext = (goNext) => ({
  type: 'SET_CAN_GO_NEXT',
  goNext
});
