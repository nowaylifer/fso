import React from 'react';
import blogService from '../services/blogs';
import { useNotification } from '../feauture/notify';
import { useUser } from '../context';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, setBlogs }) => {
  const notify = useNotification();
  const [user] = useUser();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    const update = isLiked ? -1 : 1;
    const updatedBlog = await blogService.update({ ...blog, likes: blog.likes + update });
    setBlogs((prevBlogs) => prevBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
  };

  const handleDelete = async () => {
    const shouldDelete = window.confirm(`Delete ${blog.title} blog?`);

    if (!shouldDelete) {
      return;
    }

    try {
      await blogService.remove(blog.id, user?.token);
      setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blog.id));
      notify({ message: `Deleted blog ${blog.title}` });
    } catch (error) {
      notify({ message: `Error: ${error.message}` });
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? 'hide' : 'show'}</button>
      {isVisible && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>{isLiked ? 'unlike' : 'like'}</button>
          </div>
          <div>{blog.user.name}</div>
          <button onClick={handleDelete}>delete</button>
        </>
      )}
    </div>
  );
};

export default Blog;
