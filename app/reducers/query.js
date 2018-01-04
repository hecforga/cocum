const initialState = {
  id: '',
  gender: 'mujer',
  category: '',
  fullImageUrl: '',
  croppedImageUrl: '',
  tags: null,
  searchTimes: 0,
  computePredictionsRequestTimes: 0
};

const query = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_MY_QUERY_SUCCESS':
      return {
        ...state,
        id: action.id
      };
    case 'SET_QUERY_CATEGORY':
      return {
        ...state,
        category: action.category
      };
    case 'UPLOAD_FULL_IMAGE_SUCCESS':
      return {
        ...state,
        fullImageUrl: action.imageUrl
      };
    case 'COMPUTE_PREDICTIONS_REQUEST':
      return {
        ...state,
        tags: initialState.tags,
        computePredictionsRequestTimes: state.computePredictionsRequestTimes + 1
      };
    case 'COMPUTE_PREDICTIONS_SUCCESS':
      return {
        ...state,
        tags: action.tags
      };
    case 'ON_QUERY_RESULTS_DID_MOUNT':
      return {
        ...state,
        searchTimes: state.searchTimes + 1
      };
    case 'UPLOAD_CROPPED_IMAGE_SUCCESS':
      return {
        ...state,
        croppedImageUrl: action.imageUrl
      };
    case 'ON_QUERY_RESULTS_WILL_UNMOUNT':
      return {
        ...state,
        croppedImageUrl: initialState.croppedImageUrl
      };
    case 'ON_CATEGORY_SELECTION_WILL_UNMOUNT':
    case 'ON_CATEGORY_SELECTION_RETRY_PRESS':
      return initialState;
    default:
      return state;
  }
};

export default query;

export const getQuery = (state) =>
  state;