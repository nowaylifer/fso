import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import { UserProvider } from './context/UserContext';
import LoginForm from './components/LoginForm';
import UserPanel from './components/UserPanel';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <UserProvider>
      <LoginForm />
      <UserPanel />
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </UserProvider>
  );
};

export default App;
