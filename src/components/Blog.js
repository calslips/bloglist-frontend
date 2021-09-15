import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [displayInfo, setDisplayInfo] = useState(false);

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
      {displayInfo
        ? <>
          <p>{blog.title} - {blog.author} <button onClick={() => setDisplayInfo(false)}>hide</button></p>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button>like</button></p>
          <p>{blog.user.name}</p>
          </>
        : <p>{blog.title} - {blog.author} <button onClick={() => setDisplayInfo(true)}>view</button></p>
      }
    </div>
  );
};

export default Blog
