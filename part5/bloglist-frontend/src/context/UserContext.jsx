import React from 'react';

const UserContext = React.createContext([]);

const UserProvider = (props) => {
  const value = React.useState(null);
  return <UserContext.Provider value={value} {...props} />;
};

const useUserContext = () => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
};

export { UserProvider, useUserContext };
