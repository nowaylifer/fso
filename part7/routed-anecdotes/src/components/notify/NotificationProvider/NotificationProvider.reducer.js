export const Action = {
  ADD: 'ADD_NOTIFICATION',
  REMOVE: 'REMOVE_NOTIFICATION',
};

export const notificationProviderReducer = (state, action) => {
  switch (action.type) {
    case Action.ADD:
      return [...state, { ...action.payload }];
    case Action.REMOVE:
      return state.filter((note) => note.id !== action.payload.id);
    default:
      return state;
  }
};
