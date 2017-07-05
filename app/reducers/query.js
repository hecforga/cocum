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
    case 'SET_QUERY_CATEGORY':
      return {
        ...state,
        category: action.category
      };
    default:
      return state;
  }
};

export default query;

export const getQuery = (state) =>
  state;