import React from 'react';
import { Link } from 'react-router-dom';

export default function(props) {
  return (
    <div>
      <h2>We coudln't find that page</h2>

      <Link to ='/'>Return to Home</Link>
    </div>
  )
}