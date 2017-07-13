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

export const resetQuery = () => ({
  type: 'RESET_QUERY'
});

export const cropImage = (cropImageMethod, uri, cropData) => (dispatch, getState) => {
  dispatch({
    type: 'FETCH_RESULTS_REQUEST',
  });

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

// TODO
export const uploadImage = (imageUri) => (dispatch, getState) => {

  const file = {
    // `uri` can also be a file system path (i.e. file://)
    uri: imageUri,
    name: 'image.jpg',
    type: 'image/jpg'
  }

  const options = {
    keyPrefix: 'queryImages/',
    bucket: 'cocumapp',
    region: 'eu-central-1',
    accessKey: accessKey,
    secretKey: secretKey,
    successActionStatus: 201
  }

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

export const fetchResults = (gender, category, imageUrl) => (dispatch, getState) => {
  return liresolr_api.fetchResults(gender, category, imageUrl).then(
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
  dispatch({
    type: 'FETCH_RESULTS_FAILURE',
    message: error.message  || 'Algo ha ido mal.'
  });
};

export const resetResults = () => ({
  type: 'RESET_RESULTS'
});

export const setCanGoNext = (goNext) => ({
  type: 'SET_CAN_GO_NEXT',
  goNext
});
