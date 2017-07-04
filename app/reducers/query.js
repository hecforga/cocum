const query = (state = null, action) => {
  switch (action.type) {
    case 'NEW_QUERY':
      return action.query;
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