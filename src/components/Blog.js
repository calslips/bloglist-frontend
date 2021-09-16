import React, { useState } from 'react';
import Likes from './Likes';

const Blog = ({ blog }) => {
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
        <Likes blog={blog} />
        <p>{blog.user.name}</p>
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
