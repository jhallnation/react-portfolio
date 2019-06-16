import React from 'react';

export default function(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <h3>{props.description}</h3>
      <h3>{props.role}</h3>
      <br />
    </div>
  )
}