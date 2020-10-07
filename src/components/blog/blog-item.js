import React from 'react';
import { Link } from 'react-router-dom';
import striptags from 'striptags';
import Truncate from 'react-truncate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BlogItem = props => {
  const { id, title, body, status, main_image } = props.blogItem;

  return (
    <div>
      <Link to={`/blog-post/${id}`} >
        <div className='blog-item'>
          <div className='title-container'>
            <h1>{title}</h1>
          </div>
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
      {props.loggedInStatus === 'LOGGED_IN' ? (
        <div className='delete-link'>
          <a className='delete-blog' onClick={() => props.handleDeleteClick(id)}>
            <FontAwesomeIcon icon='trash' />
          </a>
        </div>
      ) : null }
    </div>
  );
};

export default BlogItem;