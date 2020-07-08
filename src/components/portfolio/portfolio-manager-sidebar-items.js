import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PortfolioManagerSidebarItems = props => {
  const { title, subtitle, body, thumb_image, id } = props.item;
  return (
    <div className='portfolio-item-thumb'>
      <div className='portfolio-item-thumb-img'>
        <img src={thumb_image.url} />
      </div>
      <div className='side-bar-text-content'>
        <div className='title'>{title}</div>
        <a className='delete-icon' onClick={() => props.handleDeleteItem(id)}>
          <FontAwesomeIcon icon='trash' />
        </a>
      </div>
    </div>
  )

}

export default PortfolioManagerSidebarItems;