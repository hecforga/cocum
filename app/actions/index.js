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


export const fetchResults = (gender, category, imageUrl) => (dispatch, getState) => {
  dispatch({
    type: 'FETCH_RESULTS_REQUEST',
  });

  return liresolr_api.fetchResults(gender, category, imageUrl).then(
    response => {
      dispatch({
        type: 'FETCH_RESULTS_SUCCESS',
        response
      });
    },
    error => {
      dispatch({
        type: 'FETCH_RESULTS_FAILURE',
        message: error.message || 'Algo ha ido mal.'
      });
    }
  );
};