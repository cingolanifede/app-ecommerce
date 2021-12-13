export const allUserReducer = (state = null, action) => {
  switch (action.type) {
    case 'ALL_USERS':
      return action.payload;
    default:
      return state;
  }
};
