import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UserContext = React.createContext([]);

const UserProvider = (props) => {
  const value = useLocalStorage('user');
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
};

export default UserProvider;
