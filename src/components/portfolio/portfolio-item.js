import React from 'react';
import { Link } from 'react-router-dom';

export default function(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <h3>{props.description}</h3>
      <h3>{props.role}</h3>

      <Link to={`/portfolio/${props.slug}`}>Link</Link>
      <br />
    </div>
  )
}