import * as liresolr_api from '../liresolr_api';
import { RNS3 } from '../node_modules/react-native-aws3';


export const newQuery = (imageUri) => ({
  type: 'NEW_QUERY',
  imageUri
});

export const resetQuery = () => ({
  type: 'RESET_QUERY'
});

export const setQueryCategory = (category) => ({
  type: 'SET_QUERY_CATEGORY',
  category
});

export const uploadImage = (gender, category, imageUrl) => (dispatch, getState) => {
  dispatch({
    type: 'UPLOAD_IMAGE_REQUEST',
  });

  return RNS3.put(file, options).then(
    response => {
      dispatch({
        type: 'UPLOAD_IMAGE_SUCCESS',
        response
      });
      if (response.status !== 201)
        handleUploadImageError(dispatch, null);
      /**
       * {
       *   postResponse: {
       *     bucket: "your-bucket",
       *     etag : "9f620878e06d28774406017480a59fd4",
       *     key: "uploads/image.png",
       *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
       *   }
       * }
       */
    },
    error => {
      handleUploadImageError(dispatch, error);      
    }
  );
};

const handleUploadImageError = (dispatch, error) => {
  dispatch({
    type: 'UPLOAD_IMAGE_FAILURE',
    message: error.message || 'Algo ha ido mal.'
  });
}

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