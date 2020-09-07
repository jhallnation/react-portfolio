import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class FormImagesHelper extends Component {
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
      maxFiles: 1
    }
  }

  render(){
    const { editMode, image, imgString, label, handleDrop, deleteImage, imageRef } = this.props;

    if (image && editMode) {
      return (
        <div 
          className='image-wrapper'
          onMouseEnter={() => this.handleMouseEnter()}
          onMouseLeave={() => this.handleMouseLeave()}
          onClick={() => deleteImage(imgString)}
          >
          <img className={this.state.imageClass} src={image} />
          <div className='image-remove-link'>
            <FontAwesomeIcon icon='times' />
            Remove {label}
          </div>
        </div>
      )
    } else {
      return (
        <DropzoneComponent
          ref={imageRef}
          config={this.componentConfig()}
          djsConfig={this.djsConfig()}
          eventHandlers={handleDrop()}
        >
          <div className='dz-message'>{label}</div>
        </DropzoneComponent>
      )
    }
  }
}