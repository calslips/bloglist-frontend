import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const noticeContent = ( message, error=false ) => {
    setNotice({ message, error });
    setTimeout(() => {
      setNotice(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try{
      const user = await loginService.login({ username, password });

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      noticeContent(`${user.name} logged in successfully`);
      setUsername('');
      setPassword('');
    } catch (exception) {
      noticeContent('Invalid username or password', true);
    }
  };

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedInUser');
    noticeContent(`${user.name} logged out successfully`);
    setUser(null);
  };

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const blogObject = {
        title,
        author,
        url
      };

      const createdBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(createdBlog));
      noticeContent(`A new blog '${createdBlog.title}' by ${createdBlog.author} added`);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      noticeContent('Title and url are required to add new blog', true);
    }
  };

  return (
    <div>
    {user === null
      ? <>
          <h2>log in to application</h2>
          <Notification notice={notice} />
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type='text'
                value={username}
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                type='password'
                value={password}
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type='submit'>login</button>
          </form>
        </>
      : <>
          <h2>blogs</h2>
          <Notification notice={notice} />
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <h2>create new</h2>
          <form onSubmit={addBlog}>
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
          {blogs.map((blog) =>
           <Blog key={blog.id} blog={blog} />
          )}
        </>
    }
    </div>
  );
}

export default App;
