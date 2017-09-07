const initialState = {
  id: '',
  gender: 'mujer',
  category: '',
  imageUri: '',
  imageUrl: ''
};

const query = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUERY_ID':
      return {
        ...state,
        id: action.id
      };
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
        imageUrl: action.imageUrl
      };
    case 'RESET_QUERY':
      return initialState;

    case 'SET_QUERY_RESULTSLIST':
      return {
        ...state,
        resultsList: action.resultsProductUrl
      };
    default:
      return state;
  }
};

export default query;

export const getQuery = (state) =>
  state;
