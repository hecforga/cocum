import * as liresolr_api from '../liresolr_api';


export const newQuery = (imageUri) => ({
  type: 'NEW_QUERY',
  imageUri
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