const initialState = {
  category: '',
  imageUri: '',
  imageUrl: ''
};

const query = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_QUERY':
      return {
        ...state,
        imageUri: action.imageUri
      };
    case 'RESET_QUERY':
      return initialState;  
    case 'SET_QUERY_CATEGORY':
      return {
        ...state,
        category: action.category
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