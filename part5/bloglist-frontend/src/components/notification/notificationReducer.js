export const initialState = {
  isShown: false,
  message: '',
  variant: 'success',
  showTime: 5000,
};

export const Action = {
  Show: 'show',
  Close: 'close',
};

export const notificationReducer = (state, { type, message, variant, showTime }) => {
  switch (type) {
    case Action.Show: {
      return {
        isShown: true,
        message,
        variant,
        showTime,
      };
    }
    case Action.Close: {
      return initialState;
    }
    default: {
      throw new Error('Invalid action');
    }
  }
};
