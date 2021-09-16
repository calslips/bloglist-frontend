import React, { useState } from 'react';
import Likes from './Likes';
import BlogDeletion from './BlogDeletion';

const Blog = ({ blog, updates, user, notification, removeBlog }) => {
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

export default Blog
