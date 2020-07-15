import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class PorfolioFormImages extends Component {
  constructor(props){
    super(props);

    this.state = {
      imageClass: ''
    };

    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
  }

  handleMouseEnter(){
    this.setState({imageClass: 'image-blur'});
  }

  handleMouseLeave(){
    this.setState({imageClass: ''});
  }

  componentConfig() {
    return {
      iconFiletypes: ['.jpg','.png'],
      showFiletypeIcon: true,
      postUrl: 'https://httpbin.org/post'
    }
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    }
  }

  render(){
    const { editMode, image, imgString, label, imageRef } = this.props;
    return (
      <div>
        {image && editMode ? (
          <div 
            className='portfolio-manager-image-wrapper'
            onMouseEnter={() => this.handleMouseEnter()}
            onMouseLeave={() => this.handleMouseLeave()}
            onClick={() => this.props.deleteImage(imgString)}
            >
            <img className={this.state.imageClass} src={image} />
            <div className='image-remove-link'>
              <FontAwesomeIcon icon='times' />
              <h6>Remove {label}</h6>
            </div>
          </div>
        ) : (
        <DropzoneComponent
          ref={imageRef}
          config={this.componentConfig()}
          djsConfig={this.djsConfig()}
          eventHandlers={this.props.handleDrop()}
         >
           <div className='dz-message'>{label}</div>
         </DropzoneComponent>
        )}
      </div>
    )
  }
}