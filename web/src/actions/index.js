import * as liresolr_api from '../liresolr_api';

export const setQueryCategory = (category) => (dispatch, getState) => {
  dispatch({
    type: 'SET_QUERY_CATEGORY',
      category
  });

  const query = getState().query;
  return fetchResults(dispatch, query.gender, query.category, query.productId);
};

export const setQueryProductId = (productId) => (dispatch, getState) => {
  dispatch({
    type: 'SET_QUERY_PRODUCT_ID',
    productId
  });

  const query = getState().query;
  return fetchResults(dispatch, query.gender, query.category, query.productId);
};

const fetchResults = (dispatch, gender, category, productId) => {
  liresolr_api.fetchResults(gender, category, productId).then(
    results => {
      dispatch({
        type: 'FETCH_RESULTS_SUCCESS',
        results
      });
    }
  ).catch(
    error => console.log(error)
  );
};