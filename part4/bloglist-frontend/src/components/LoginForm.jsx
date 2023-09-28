import { useUser } from '../context/UserContext';
import authService from '../services/auth';

const LoginForm = () => {
  const [, setUser] = useUser();
  const [inputValue, setInputValue] = React.useState({ username: '', password: '' });

  const handleSubmit = async () => {
    try {
      const user = await authService.login(inputValue);
      setUser(user);
    } catch (error) {}
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
    </form>
  );
};

export default LoginForm;
