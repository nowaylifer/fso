import React from 'react';

const UserContext = React.createContext(null);

const UserProvider = (props) => {
  const value = React.useState(null);
  return <UserContext.Provider value={value} {...props} />;
};

const useUser = () => React.useContext(UserContext);

export { UserProvider, useUser };
