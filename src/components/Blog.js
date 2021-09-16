import React, { useState } from 'react';
import Likes from './Likes';
import BlogDeletion from './BlogDeletion';
import PropTypes from 'prop-types';

const Blog = ({ blog, updates, user, notification, removeBlog, logout }) => {
  const [showAllInfo, setShowAllInfo] = useState(false);

  const minBlogInfo = { display: showAllInfo ? 'none' : '' };
  const maxBlogInfo = { display: showAllInfo ? '' : 'none' };

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      <div style={maxBlogInfo}>
        <p>{blog.title} - {blog.author}
          <button onClick={() => setShowAllInfo(false)}>hide</button>
        </p>
        <p>{blog.url}</p>
        <Likes blog={blog} updates={updates} />
        <p>{blog.user.name}</p>
        {(user.name === blog.user.name)
          ? <BlogDeletion
            blog={blog}
            notification={notification}
            removeBlog={removeBlog}
            forceLogout={logout}
          />
          : <></>
        }
      </div>
      <div style={minBlogInfo}>
        <p>{blog.title} - {blog.author}
          <button onClick={() => setShowAllInfo(true)}>view</button>
        </p>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updates: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  notification: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default Blog;
