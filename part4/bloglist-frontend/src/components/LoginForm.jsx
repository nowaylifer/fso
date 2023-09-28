import { useUserContext } from '../context/UserContext';
import authService from '../services/auth';
import { Notification } from './notification/Notification';

const LoginForm = () => {
  const [, setUser] = useUserContext();
  const [inputValue, setInputValue] = React.useState({ username: '', password: '' });
  const notifyRef = React.useRef();

  const handleSubmit = async () => {
    try {
      const user = await authService.login(inputValue);
      setUser(user);
      notifyRef.current.success('Successful login');
    } catch (error) {
      notifyRef.current.error(error.message);
    }
  };

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        username:
        <input name="username" value={inputValue.username} onChange={handleChange} />
      </label>
      <label>
        password:
        <input name="password" value={inputValue.password} onChange={handleChange} />
      </label>
      <button type="submit">login</button>
      <Notification ref={notifyRef} />
    </form>
  );
};

export default LoginForm;
