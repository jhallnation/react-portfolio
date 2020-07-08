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
        <div className='actions'>
          <a className='action-icon edit-item' onClick={() => props.handleEditItem(props.item)}>
            <FontAwesomeIcon icon='edit' />
          </a>
          <a className='action-icon delete-item' onClick={() => props.handleDeleteItem(id)}>
            <FontAwesomeIcon icon='trash' />
        </a>
        </div>
      </div>
    </div>
  )

}

export default PortfolioManagerSidebarItems;