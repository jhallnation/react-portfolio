import React from 'react';
import { Link } from 'react-router-dom';

export default function() {
  return (
    <div>
      <div>Blog</div>
      <div>
        <Link to='/about-me'>Read more about me</Link>
      </div>
    </div>
  )
}