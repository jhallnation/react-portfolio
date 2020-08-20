import React from 'react';
import { Link } from 'react-router-dom';
import striptags from 'striptags';
import Truncate from 'react-truncate';

const BlogItem = props => {
  const { id, title, body, status } = props.blogItem;

  return (
    <Link to={`/blog-post/${id}`} >
      <div>
        <h1>{title}</h1>
        <div className='blog-summary'>
          <Truncate
            lines={5}
            ellipsis={
              <span className='read-more'>
                ...Read More
              </span>
            }
          >
            {striptags(body)}
          </Truncate>
        </div>
      </div>
    </Link>
  );
};

export default BlogItem;