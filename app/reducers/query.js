const initialState = {
  gender: 'mujer',
  category: '',
  imageUri: '',
  imageUrl: ''
};

const query = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUERY_CATEGORY':
      return {
        ...state,
        category: action.category
      };
    case 'CROP_IMAGE_SUCCESS':
      return {
        ...state,
        imageUri: action.imageUri
      };
    case 'UPLOAD_IMAGE_SUCCESS':
      return {
        ...state,
        imageUrl: action.response.imageUrl
      };
    default:
      return state;
  }
};

export default query;

export const getQuery = (state) =>
  state;
