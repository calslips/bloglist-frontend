import React, { useState } from 'react';

const BlogForm = ({ notification, addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [createBlogFormVisible, setCreateBlogFormVisible] = useState(false);

  const hideWhenVisible = { display: createBlogFormVisible ? 'none' : '' };
  const showWhenVisible = { display: createBlogFormVisible ? '' : 'none' };

  const createBlog = async (event) => {
    event.preventDefault();

    try {
      const blogObject = {
        title,
        author,
        url
      };

      await addBlog(blogObject);
      notification(`A new blog '${blogObject.title}' by ${blogObject.author} added`);
      setTitle('');
      setAuthor('');
      setUrl('');
      setCreateBlogFormVisible(false);
    } catch (exception) {
      notification('Title and url are required to add new blog', true);
    }
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateBlogFormVisible(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <form onSubmit={createBlog}>
          <div>
            title:
            <input
              type='text'
              value={title}
              name='Title'
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type='text'
              value={author}
              name='Author'
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type='text'
              value={url}
              name='Url'
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type='submit'>create</button>
        </form>
        <button onClick={() => setCreateBlogFormVisible(false)}>cancel</button>
      </div>
    </div>
  );
};

export default BlogForm;
