import React from 'react';
import { Link } from 'react-router-dom';

const BlogItem = props => {
  const { id, title, body, status } = props.blogItem;

  return (
    <Link to={`/blog-post/${id}`} >
      <div>
        <h1>{title}</h1>
        <h3>{body}</h3>
      </div>
    </Link>
  );
};

export default BlogItem;