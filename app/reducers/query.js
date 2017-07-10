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
    case 'SET_QUERY_IMAGE_URI':
      return {
        ...state,
        imageUri: action.imageUri
      };
    default:
      return state;
  }
};

export default query;

export const getQuery = (state) =>
  state;