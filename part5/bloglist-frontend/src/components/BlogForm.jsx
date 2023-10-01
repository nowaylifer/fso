import React from 'react';
import Input from './Input';
import blogService from '../services/blogs';
import { useNotification } from '../feauture/notify';
import { useUser } from '../context';

const BlogForm = ({ setBlogs }) => {
  const notify = useNotification();
  const [user] = useUser();
  const [inputValues, setInputValues] = React.useState({ title: '', author: '', url: '' });

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputValues);

    try {
      const createdBlog = await blogService.create(inputValues, user.token);
      setBlogs((prevBlogs) => [...prevBlogs, createdBlog]);
      notify({ message: 'Blog created' });
    } catch (error) {
      notify({ message: `Error: ${error.message}`, type: 'error' });
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <Input name="title" label="title: " value={inputValues.title} onChange={handleChange} />
        </p>
        <p>
          <Input
            name="author"
            label="author: "
            value={inputValues.author}
            onChange={handleChange}
          />
        </p>
        <p>
          <Input name="url" label="url: " value={inputValues.url} onChange={handleChange} />
        </p>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
