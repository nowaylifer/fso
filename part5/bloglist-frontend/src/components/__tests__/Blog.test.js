import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../Blog';
import { fakeBlog } from '../../../test/__fixtures__/blog';

jest.mock('../../services/blogs');

const user = userEvent.setup();

describe('Blog', () => {
  it("displays a blog's title and author", () => {
    render(<Blog blog={fakeBlog} setBlogs={jest.fn()} />);

    expect(screen.getByText(fakeBlog.author, { exact: false })).toBeVisible();
    expect(screen.getByText(fakeBlog.title, { exact: false })).toBeVisible();
    expect(screen.queryByText(fakeBlog.url, { exact: false })).toBeNull();
    expect(screen.queryByText(/likes 0/i, { exact: false })).toBeNull();
    expect(screen.queryByText(fakeBlog.user.name, { exact: false })).toBeNull();
  });

  it("displays a blog's url and likes when the toggle button has been clicked", async () => {
    render(<Blog blog={fakeBlog} setBlogs={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: /show/i }));

    expect(screen.getByText(/likes 0/i)).toBeVisible();
    expect(screen.getByText(fakeBlog.url, { exact: false })).toBeVisible();

    await user.click(screen.getByRole('button', { name: /hide/i }));

    await waitFor(() => {
      expect(screen.queryByText(/likes 0/i)).toBeNull();
      expect(screen.queryByText(fakeBlog.url, { exact: false })).toBeNull();
    });
  });

  it('correctly handles click on the "like" button', async () => {
    const mockSetBlogs = jest.fn();

    render(<Blog blog={fakeBlog} setBlogs={mockSetBlogs} />);
    await user.click(screen.getByRole('button', { name: /show/i }));

    await user.click(screen.getByRole('button', { name: /like/i }));

    await waitFor(() => expect(mockSetBlogs).toHaveBeenCalledTimes(1));
  });
});
