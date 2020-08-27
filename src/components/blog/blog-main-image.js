import React from "react";

const BlogMainImage = props => {
  if (!props.main_image) {
    return null;
  }

  return (
    <div className="blog-main-image">
      <img src={props.main_image} />
    </div>
  );
};

export default BlogMainImage;