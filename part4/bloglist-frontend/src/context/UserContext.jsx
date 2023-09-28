import React from 'react';

const UserContext = React.createContext(null);

const UserProvider = (props) => {
  const value = React.useState(null);
  return <UserContext.Provider value={value} {...props} />;
};

const useUserContext = () => React.useContext(UserContext);

export { UserProvider, useUserContext };
