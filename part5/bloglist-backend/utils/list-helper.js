const calcTotalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const getFavoriteBlog = (blogs) => {
  return blogs.reduce((result, current) => (result.likes < current.likes ? current : result));
};

const getAuthorWithMostBlogs = (blogs) => {
  const blogMap = blogs.reduce((acc, blog) => {
    const { author } = blog;

    if (author in acc) {
      acc[author]++;
    } else {
      acc[author] = 1;
    }

    return acc;
  }, {});

  const resultAuthor = Object.keys(blogMap).reduce((res, cur) =>
    blogMap[cur] > blogMap[res] ? cur : res
  );

  return { author: resultAuthor, blogs: blogMap[resultAuthor] };
};

const getAuthorWithMostLikes = (blogs) => {
  const likeMap = blogs.reduce((acc, blog) => {
    const { author, likes } = blog;

    if (author in acc) {
      acc[author] += likes;
    } else {
      acc[author] = likes;
    }

    return acc;
  }, {});

  const resultAuthor = Object.keys(likeMap).reduce((res, cur) =>
    likeMap[cur] > likeMap[res] ? cur : res
  );

  return { author: resultAuthor, likes: likeMap[resultAuthor] };
};

module.exports = {
  calcTotalLikes,
  getFavoriteBlog,
  getAuthorWithMostBlogs,
  getAuthorWithMostLikes,
};
