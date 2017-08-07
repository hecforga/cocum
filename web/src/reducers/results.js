const results = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_RESULTS_SUCCESS':
      return action.results.map(id => id);
    default:
      return state;
  }
};

export default results;

export const getResults = (state) => state;