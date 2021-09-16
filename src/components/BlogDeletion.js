import React from 'react';

const BlogDeletion = ({ blog, notification, removeBlog }) => {
  const deleteBlog = async () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
      await removeBlog(blog.id);
      notification(`Removed blog '${blog.title}' by ${blog.author}`);
    }
  }

  return (
    <button onClick={deleteBlog}>remove</button>
  );
}

export default BlogDeletion;
