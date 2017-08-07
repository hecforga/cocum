const initialState = {
  givenRating:0,
  isVisible: true
};

const ratingBarState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GIVEN_RATING':
      return{
        ...state,
        givenRating: action.givenRating
      };
    case 'SET_RATINGBAR_VISIBILITY':
      return{
        ...state,
        isVisible: action.isVisible
      };
    case 'RESET_RATINGBAR_STATE':
      return initialState;
    default:
      return state;
  }
};

export default ratingBarState;

export const getRatingBarState = (state) =>
  state;