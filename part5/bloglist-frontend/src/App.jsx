import React from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import UserPanel from './components/UserPanel';
import BlogForm from './components/BlogForm';
import { useUser } from './context';

const App = () => {
  const [blogs, setBlogs] = React.useState([]);
  const [user] = useUser();

  React.useEffect(() => {
    blogService.getAll().then(setBlogs);
  }, []);

  return (
    <>
      {user ? (
        <>
          <UserPanel />
          <BlogForm setBlogs={setBlogs} />
        </>
      ) : (
        <LoginForm />
      )}
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default App;
