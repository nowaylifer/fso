export const Action = {
  Add: 'ADD_NOTIFICATION',
  Remove: 'REMOVE_NOTIFICATION',
};

export const notificationProviderReducer = (state, action) => {
  switch (action.type) {
    case Action.Add:
      return [...state, { ...action.payload }];
    case Action.Remove:
      return state.filter((note) => note.id !== action.payload.id);
    default:
      return state;
  }
};
