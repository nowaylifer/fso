import React from 'react';
import Notification from '../Notification';
import styles from './NotificationProvider.module.css';
import { notificationProviderReducer, Action } from './NotificationProvider.reducer';

const NotificationContext = React.createContext();

const NotificationProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(notificationProviderReducer, []);

  const removeNotification = (id) => {
    dispatch({ type: Action.Remove, payload: { id } });
  };

  return (
    <NotificationContext.Provider value={dispatch}>
      <div className={styles.notificationWrapper}>
        {state.map((note) => (
          <Notification key={note.id} onClose={() => removeNotification(note.id)} {...note} />
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const dispatch = React.useContext(NotificationContext);

  return (props) => {
    dispatch({
      type: Action.Add,
      payload: {
        id: crypto.randomUUID(),
        ...props,
      },
    });
  };
};

export default NotificationProvider;
