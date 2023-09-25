const { blogs, listWithOneBlog } = require('../__mocks__/blogs');
const listHelper = require('../../utils/list-helper');

describe('total likes', () => {
  test('equals the sum of likes of the each blog', () => {
    const result = listHelper.calcTotalLikes(blogs);
    expect(result).toBe(36);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.calcTotalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe('favorite blog', () => {
  test('equals the blog with most of the likes', () => {
    const result = listHelper.getFavoriteBlog(blogs);
    expect(result).toBe(blogs[2]);
  });

  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.getFavoriteBlog(listWithOneBlog);
    const [blog] = listWithOneBlog;
    expect(result).toBe(blog);
  });
});

describe('author with most of the blogs', () => {
  test('should return object with that author and their number of blogs', () => {
    const result = listHelper.getAuthorWithMostBlogs(blogs);
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });

  test("when list has only one blog, equals that blog's author", () => {
    const result = listHelper.getAuthorWithMostBlogs(listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 });
  });
});

describe('author with most of the likes', () => {
  test('should return object with that author and their number of likes', () => {
    const result = listHelper.getAuthorWithMostLikes(blogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });

  test("when list has only one blog, equals that blog's author", () => {
    const result = listHelper.getAuthorWithMostLikes(listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 });
  });
});
