import React from 'react';

const PortfolioManagerSidebarItems = props => {
  const { title, subtitle, body, thumb_image, id } = props.item;
  return (
    <div className='portfolio-item-thumb'>
      <div className='portfolio-item-thumb-img'>
        <img src={thumb_image.url} />
      </div>
      <h5 className='title'>{title}</h5>
    </div>
  )

}

export default PortfolioManagerSidebarItems;