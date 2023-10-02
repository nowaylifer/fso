import React from 'react';

const Togglable = ({ label, children, initialVisible = false }) => {
  const [isVisible, setIsVisible] = React.useState(initialVisible);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (!isVisible) {
    return <button onClick={toggleVisibility}>{label.show}</button>;
  }

  return (
    <div>
      {children}
      <button onClick={toggleVisibility}>{label.hide}</button>
    </div>
  );
};

export default Togglable;
