import { ImagePicker } from 'expo';
import { RNS3 } from 'react-native-aws3';

import { getQuery } from '../reducers';
import { accessKey, secretKey } from '../credentials/s3credentials.js';

export const onCategorySelectionDidMount = () => ({
  type: 'ON_CATEGORY_SELECTION_DID_MOUNT',
});

export const pickImage = (imagePickerMode) => (dispatch, getState) => {
  if (imagePickerMode === 'gallery') {
    ImagePicker.launchImageLibraryAsync({allowsEditing: false})
      .then((pickedImage) => handlePickedImage(pickedImage, dispatch));
  } else {
    ImagePicker.launchCameraAsync({allowsEditing: false})
      .then((pickedImage) => handlePickedImage(pickedImage, dispatch));
  }
};

const handlePickedImage = (pickedImage, dispatch) => {
  if (pickedImage.cancelled) {
    dispatch({
      type: 'IMAGE_PICKER_CANCELLED'
    });
  } else {
    dispatch({
      type: 'SELECT_IMAGE',
      imageUri: pickedImage.uri,
      width: pickedImage.width,
      height: pickedImage.height
    });
  }
};

export const setSelectedImageLayout = (layout) => ({
  type: 'SET_SELECTED_IMAGE_LAYOUT',
  layout
});

export const setSelectedImageCropData = (cropData) => ({
  type: 'SET_SELECTED_IMAGE_CROP_DATA',
  cropData
});

export const createMyQuery = (mutate, query) => (dispatch, getState) => {
  mutate({
    variables: { gender: query.gender }
  }).then((response) => {
    dispatch({
      type: 'CREATE_MY_QUERY_SUCCESS',
      id: response.data.createMyQuery.id,
      category: getQuery(getState()).category
    });
  }).catch(
    error => handleCategorySelectionFailure(dispatch, error)
  );
};

export const setQueryCategory = (category, id) => ({
  type: 'SET_QUERY_CATEGORY',
  category,
  id
});

export const uploadFullImage = (queryId, imageUri, category) => (dispatch, getState) => {
  const file = {
    uri: imageUri,
    name: queryId + '.jpg',
    type: 'image/jpg'
  };

  const options = {
    keyPrefix: 'query_images_full/' + category + '/',
    bucket: 'cocumapp',
    region: 'eu-central-1',
    accessKey: accessKey,
    secretKey: secretKey,
    successActionStatus: 201
  };

  RNS3.put(file, options).then(
    response => {
      if (response.status !== 201) {
        throw new Error();
      }
      dispatch({
        type: 'UPLOAD_FULL_IMAGE_SUCCESS',
        imageUrl: response.body.postResponse.location
      });
    }
  ).catch(
    error => handleCategorySelectionFailure(dispatch, error)
  );
};

export const computePredictions = (mutate, query) => (dispatch, getState) => {
  dispatch({
    type: 'COMPUTE_PREDICTIONS_REQUEST'
  });
  mutate({
    variables: {
      gender: query.gender,
      category: query.category,
      imageUrl: query.fullImageUrl
    }
  }).then((response) => {
    const nextQuery = getQuery(getState());
    if (query.computePredictionsRequestTimes === nextQuery.computePredictionsRequestTimes - 1) {
      dispatch({
        type: 'COMPUTE_PREDICTIONS_SUCCESS',
        tags: response.data.computePredictions.tags,
        croppedImageUrl: nextQuery.croppedImageUrl
      });
    }
  }).catch(
    error => handleCategorySelectionFailure(dispatch, error)
  );
};

const handleCategorySelectionFailure = (dispatch, error) => {
  console.log(error);
  dispatch({
    type: 'CATEGORY_SELECTION_FAILURE',
    message: 'Algo ha ido mal'
  });
};

export const onCategorySelectionRetryPress = () => ({
  type: 'ON_CATEGORY_SELECTION_RETRY_PRESS'
});

export const onCategorySelectionWillUnmount = () => ({
  type: 'ON_CATEGORY_SELECTION_WILL_UNMOUNT'
});

export const cropImage = (tabName, cropImageMethod, uri, cropData) => (dispatch, getState) => {
  new Promise((resolve, reject) => {
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
    error => handleResultsFailure(dispatch, tabName, error)
  );
};

export const uploadCroppedImage = (tabName, queryId, searchTimes, imageUri, category) => (dispatch, getState) => {
  const file = {
    uri: imageUri,
    name: queryId + '_' + searchTimes + '.jpg',
    type: 'image/jpg'
  };

  const options = {
    keyPrefix: 'query_images_cropped/' + category + '/',
    bucket: 'cocumapp',
    region: 'eu-central-1',
    accessKey: accessKey,
    secretKey: secretKey,
    successActionStatus: 201
  };

  RNS3.put(file, options).then(
    response => {
      if (response.status !== 201) {
        throw new Error();
      }
      dispatch({
        type: 'UPLOAD_CROPPED_IMAGE_SUCCESS',
        tabName,
        imageUrl: response.body.postResponse.location,
        tags: getQuery(getState()).tags
      });
    }
  ).catch(
    error => handleResultsFailure(dispatch, tabName, error)
  );
};

export const getProductTags = (mutate, tabName, gender, category, productId) => (dispatch, getState) => {
  mutate({
    variables: {
      gender,
      category,
      productId
    }
  }).then((response) => {
    if(response.errors) {
      throw new Error(response.errors[0].message);
    }
    dispatch({
      type: 'GET_PRODUCT_TAGS_SUCCESS',
      tabName,
      tags: response.data.getProductTags.tags
    });
  }).catch(
    error => handleResultsFailure(dispatch, tabName, error)
  );
};

export const computeResults = (mutate, tabName, mode, gender, category, imageUrl, productId, tags, filters) => (dispatch, getState) => {
  mutate({
    variables: {
      mode,
      gender,
      category,
      imageUrl,
      productId,
      tags,
      filters
    }
  }).then((response) => {
    if(response.errors) {
      throw new Error(response.errors[0].message);
    }
    dispatch({
      type: 'COMPUTE_RESULTS_SUCCESS',
      tabName,
      ids: response.data.computeResults.results
    });
  }).catch(
    error => handleResultsFailure(dispatch, tabName, error)
  );
};

const handleResultsFailure = (dispatch, tabName, error) => {
  console.log(error);
  dispatch({
    type: 'RESULTS_FAILURE',
    tabName,
    message: 'Algo ha ido mal'
  });
};

export const onResultsRetryPress = (tabName) => ({
  type: 'ON_RESULTS_RETRY_PRESS',
  tabName
});

export const onQueryResultsDidMount = (tabName) => ({
  type: 'ON_QUERY_RESULTS_DID_MOUNT',
  tabName
});

export const onCocumItResultsDidMount = (tabName) => ({
  type: 'ON_COCUM_IT_RESULTS_DID_MOUNT',
  tabName
});

export const onRandomResultsDidMount = (tabName) => ({
  type: 'ON_RANDOM_RESULTS_DID_MOUNT',
  tabName
});

export const onQueryResultsWillUnmount = (tabName) => ({
  type: 'ON_QUERY_RESULTS_WILL_UNMOUNT',
  tabName
});

export const onCocumItResultsWillUnmount = (tabName) => ({
  type: 'ON_COCUM_IT_RESULTS_WILL_UNMOUNT',
  tabName
});

export const onRandomResultsWillUnmount = (tabName) => ({
  type: 'ON_RANDOM_RESULTS_WILL_UNMOUNT',
  tabName
});

export const setCocumItProductId = (product) => ({
  type: 'SET_COCUM_IT_PRODUCT_ID',
  productId: product.productId
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

export const onWebViewWillUnmount = () => ({
  type: 'ON_WEB_VIEW_WILL_UNMOUNT'
});