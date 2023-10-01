import React from 'react';
import authService from '../services/auth';
import { useNotification } from '../feauture/notify';
import { useUser } from '../context/UserContext';

const LoginForm = () => {
  const notify = useNotification();
  const [, setUser] = useUser();
  const [inputValue, setInputValue] = React.useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loggedInUser = await authService.login(inputValue);
      setUser(loggedInUser);
      setInputValue({ username: '', password: '' });
      notify({ message: 'Successful login' });
    } catch (error) {
      notify({ message: error.message, type: 'error' });
    }
  };

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

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
      </form>
    </div>
  );
};

export default React.memo(LoginForm);
