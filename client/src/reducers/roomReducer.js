export const roomReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ROOMS':
      return { ...state, rooms: action.payload };
    default:
      return state;
  }
};
