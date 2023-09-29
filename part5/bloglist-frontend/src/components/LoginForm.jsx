import React from 'react';
import { useUserContext } from '../context/UserContext';
import authService from '../services/auth';
import { Notification } from './notification/Notification';

const LoginForm = () => {
  const [user, setUser] = useUserContext();
  const [inputValue, setInputValue] = React.useState({ username: '', password: '' });
  const notifyRef = React.useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loggedInUser = await authService.login(inputValue);
      setUser(loggedInUser);
      setInputValue({ username: '', password: '' });
      notifyRef.current.success('Successful login');
    } catch (error) {
      notifyRef.current.error(error.message);
    }
  };

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  if (user) {
    return null;
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            username:
            <input name="username" value={inputValue.username} onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            password:
            <input name="password" value={inputValue.password} onChange={handleChange} />
          </label>
        </p>
        <button type="submit">login</button>
        <Notification ref={notifyRef} />
      </form>
    </div>
  );
};

export default LoginForm;
