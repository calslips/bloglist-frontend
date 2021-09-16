import React, { useState } from 'react';
import blogRequests from '../services/blogs';

const Likes = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes);
  const [alreadyLiked, setAlreadyLiked] = useState(false);

  const likeBlog = async (likeStatus) => {
    if (likeStatus) {
      const updateLikes = {
        likes: likes + 1
      };
      await blogRequests
        .update(blog.id, updateLikes);
      setLikes(updateLikes.likes);
      setAlreadyLiked(likeStatus);
    } else {
      const updateLikes = {
        likes: likes - 1
      };
      await blogRequests
        .update(blog.id, updateLikes);
      setLikes(updateLikes.likes);
      setAlreadyLiked(likeStatus);
    }
  };

  return (
    <>
    {alreadyLiked
      ? <p>likes {likes}
          <button onClick={() => {likeBlog(false)}}>unlike</button>
        </p>
      : <p>likes {likes}
          <button onClick={() => {likeBlog(true)}}>like</button>
        </p>
    }
    </>
  );
};

export default Likes;
