const canGoNext = (state = false, action) => {
  switch (action.type) {
    case 'SET_CAN_GO_NEXT':
      return action.canGoNext;
    default:
      return state;
  }
};

export default canGoNext;

export const getCanGoNext = (state) =>
  state;