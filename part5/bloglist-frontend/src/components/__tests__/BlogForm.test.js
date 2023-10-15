import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from '../BlogForm';
import { fakeBlog } from '../../../test/__fixtures__/blog';
import blogService from '../../services/blogs';
import { useNotification } from '../../feauture/notify';
import { useUser } from '../../context';

jest.mock('../../services/blogs');
jest.mock('../../feauture/notify');
jest.mock('../../context');

const fakeToken = '123';

useNotification.mockReturnValue(jest.fn());
useUser.mockReturnValue([{ token: fakeToken }]);
blogService.create.mockResolvedValueOnce(fakeBlog);

const user = userEvent.setup();

describe('BlogForm', () => {
  it('create new blog with the right details', async () => {
    const mockSetBlogs = jest.fn();
    render(<BlogForm setBlogs={mockSetBlogs} />);

    const inputValue = {
      author: fakeBlog.author,
      title: fakeBlog.title,
      url: fakeBlog.url,
    };

    await user.type(screen.getByLabelText(/author/i), inputValue.author);
    await user.type(screen.getByLabelText(/title/i), inputValue.title);
    await user.type(screen.getByLabelText(/url/i), inputValue.url);
    await user.click(screen.getByRole('button', { name: /create/i }));

    expect(blogService.create).toHaveBeenCalledWith(inputValue, fakeToken);
  });
});
