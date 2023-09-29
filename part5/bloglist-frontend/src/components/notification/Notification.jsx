import React from 'react';
import clsx from 'clsx';
import styles from './Notification.module.css';
import { createPortal } from 'react-dom';
import { notificationReducer, Action, initialState } from './notificationReducer';

export const Notification = React.forwardRef((_, ref) => {
  const [state, dispatch] = React.useReducer(notificationReducer, initialState);

  React.useImperativeHandle(ref, () => ({
    success: (message = '', showTime = 5000) => {
      dispatch({ type: Action.Show, message, variant: 'success', showTime });
    },
    error: (message = '', showTime = 5000) => {
      dispatch({ type: Action.Show, message, variant: 'error', showTime });
    },
  }));

  React.useEffect(() => {
    if (state.isShown) {
      const id = setTimeout(() => dispatch({ type: Action.Close }), state.showTime);
      return () => clearInterval(id);
    }
  }, [state.isShown]);

  return createPortal(
    state.isShown && (
      <div className={clsx(styles.notification, styles[state.variant])}>{state.message}</div>
    ),
    document.body
  );
});

Notification.displayName = 'Notification';
