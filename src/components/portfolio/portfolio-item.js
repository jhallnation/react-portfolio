import React from 'react';
import { Link } from 'react-router-dom';

export default function(props) {
      // Data tgat I'll need
    // - background image: thumb_image_url
    // - logo: logo_url
    // - description: description
    // - id: id
    // - position: url
    // ["id", "name", "description", "url", "category", "position", "thumb_image_url", "banner_image_url", "logo_url", "column_names_merged_with_images"]

  const { title, subtitle, body, thumb_image, id } = props.item;
  return (
    <div>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <h3>{body}</h3>
      {/* <h3>{url}</h3> not currently in portfolio table */}
      {/* <img src={thumb_image.url} /> */}

      <Link to={`/portfolio/${id}`}>Link</Link>
      <br />
    </div>
  )
}