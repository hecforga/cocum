const initialState = {
  gender: 'mujer',
  category: '',
  productId: ''
};

const query = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUERY_CATEGORY':
      return {
        ...state,
        category: action.category,
        productId: ''
      };
    case 'SET_QUERY_PRODUCT_ID':
      return {
        ...state,
        productId: action.productId
      };
    default:
      return state;
  }
};

export default query;

export const getQuery = (state) =>
  state;
