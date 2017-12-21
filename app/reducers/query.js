const initialState = {
  id: '',
  gender: 'mujer',
  category: '',
  fullImageUrl: '',
  croppedImageUrl: '',
  tags: null
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
    case 'COMPUTE_PREDICTIONS_SUCCESS':
      return {
        ...state,
        tags: action.tags
      };
    case 'UPLOAD_CROPPED_IMAGE_SUCCESS':
      return {
        ...state,
        croppedImageUrl: action.imageUrl
      };
    case 'ON_CATEGORY_SELECTION_WILL_UNMOUNT':
      return initialState;
    default:
      return state;
  }
};

export default query;

export const getQuery = (state) =>
  state;