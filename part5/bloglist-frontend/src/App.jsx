import React from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import UserPanel from './components/UserPanel';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { useUser } from './context';

const App = () => {
  const [blogs, setBlogs] = React.useState([]);
  const [user] = useUser();

  React.useEffect(() => {
    blogService.getAll().then(setBlogs);
  }, []);

  const sortedBlogs = React.useMemo(() => [...blogs].sort((a, b) => a.likes - b.likes), [blogs]);

  return (
    <>
      {user ? (
        <>
          <UserPanel />
          <Togglable label={{ show: 'create blog', hide: 'cancel' }}>
            <BlogForm setBlogs={setBlogs} />
          </Togglable>
        </>
      ) : (
        <LoginForm />
      )}
      <h2>blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
      ))}
    </>
  );
};

export default App;
