import React, { Component } from 'react';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';

import FormImagesHelper from '../../helpers/form-images-helper';
import PortfolioClearImage from './portfolio-clear-image';

import '../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../node_modules/dropzone/dist/min/dropzone.min.css';

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      subtitle: '',
      body: '',
      work_type: 'Home Project',
      main_image: '',
      thumb_image: '',
      logo: '',
      url: '',

      apiURL: 'http://localhost:3000/api/portfolio/new',
      apiAction: 'post',
      editMode: false,

      requestHeaders: { 
        'Authorization' : localStorage.getItem('token'),
        'jhUserEmail' : localStorage.getItem('userEmail'),
      },

    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.removeImageFromForm = this.removeImageFromForm.bind(this);

    this.handleThumbDrop = this.handleThumbDrop.bind(this);
    this.handleMainImageDrop = this.handleMainImageDrop.bind(this);
    this.handleLogoDrop = this.handleLogoDrop.bind(this);

    this.deleteImage = this.deleteImage.bind(this);

    this.thumbRef = React.createRef();
    this.mainImageRef = React.createRef();
    this.logoRef = React.createRef();
  }

  removeImageFromForm(image) {
    switch (image) {
      case 'Thumb Image':
        this.setState({ thumb_image: '' });
        this.thumbRef.current.dropzone.removeAllFiles();
        break;
      case 'Main Image':
      this.setState({ main_image: '' });
        this.mainImageRef.current.dropzone.removeAllFiles();
        break;
      case 'Logo':
        this.setState({ logo: '' });
        this.logoRef.current.dropzone.removeAllFiles();
        break;
      default:
        console.error(image, 'removeImageFromForm invalid input');
    }
  }

  clearForm(){
    this.setState({
      title: '',
      subtitle: '',
      body: '',
      work_type: 'Home Project',
      main_image: '',
      thumb_image: '',
      logo: '',
      url: '',

      apiURL: 'http://localhost:3000/api/portfolio/new',
      apiAction: 'post',
      editMode: false,

      requestHeaders: { 
        'Authorization' : localStorage.getItem('token'),
        'jhUserEmail' : localStorage.getItem('userEmail'),
      },

    });

    [this.thumbRef,this.mainImageRef,this.logoRef].forEach(ref => {
      if (ref.current != null) {
        ref.current.dropzone.removeAllFiles();
      }
    });
  }

  deleteImage(imageType) {
    this.state.requestHeaders['imageToDelete'] = imageType;

    axios.delete(
      'http://localhost:3000/api/portfolio/delete-image',
      { 
        headers: this.state.requestHeaders
      }
    ).then(response => {
      if (response.data.delete_portfolio_image == false) {
         console.error('Unable to delete image');
       } else {
         this.setState({
           [`${imageType}_url`]: ''
         });

         this.props.getPortfolioItems();
       }
    }).catch(error => {
      console.error('delete image error', error);
    })
  }

  componentDidUpdate() {
    if (Object.keys(this.props.itemToEdit).length > 0) {
      const { title, subtitle, body, url, work_type, thumb_image, main_image, logo, id } = this.props.itemToEdit;

      this.props.clearItemToEdit();

      this.setState({
        title: title || '',
        subtitle: subtitle || '',
        body: body || '',
        url: url || '',
        work_type: work_type || '',

        thumb_image_url: thumb_image.url || '',
        main_image_url: main_image.url || '',
        logo_url: logo.url || '',

        apiURL: 'http://localhost:3000/api/portfolio/edit',
        apiAction: 'patch',
        editMode: true,

        requestHeaders: { 
          'Authorization' : localStorage.getItem('token'),
          'jhUserEmail' : localStorage.getItem('userEmail'),
          'portfolioItemID' : id
        }

      });
    };
  }

  handleThumbDrop() {
    return {
      addedfile: file => this.setState({
        thumb_image: file
      })
    };
  }

  handleMainImageDrop() {
    return {
      addedfile: file => this.setState({
        main_image: file
      })
    };
  }

   handleLogoDrop() {
    return {
      addedfile: file => this.setState({
        logo: file
      })
    };
  }

  buildForm() {
    let formData = new FormData();

    formData.append('portfolios[title]', this.state.title);
    formData.append('portfolios[subtitle]', this.state.subtitle);
    formData.append('portfolios[body]', this.state.body);
    formData.append('portfolios[work_type]', this.state.work_type);
    formData.append('portfolios[url]', this.state.url);

    if (this.state.thumb_image) {
      formData.append('portfolios[thumb_image]', this.state.thumb_image);
    }
    if (this.state.main_image) {
      formData.append('portfolios[main_image]', this.state.main_image);
    }
    if (this.state.logo) {
      formData.append('portfolios[logo]', this.state.logo);
    }

    return formData;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    axios({
      method: this.state.apiAction,
      url: this.state.apiURL,
      data: this.buildForm(),
      headers: this.state.requestHeaders
    })
    .then(response => {
       if (response.data.new_edit_portfolio == false) {
         console.error('Unable to create/edit portfolio item');
       } else {
         this.props.getPortfolioItems();

         this.clearForm();

       }
     }).catch(error =>{
       console.error("portfolio form handle submit error", error);
     });

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='portfolio-form-wrapper'>
        <div className='two-column'>
          <input 
            type='text'
            name='title'
            placeholder='Title'
            value={this.state.title}
            onChange={this.handleChange}
            required
          />
          <input 
            type='text'
            name='url'
            placeholder='URL'
            value={this.state.url}
            onChange={this.handleChange}
          />
        </div>
        <div className='two-column'>
          <input 
            type='text'
            name='subtitle'
            placeholder='Subttile'
            value={this.state.subtitle}
            onChange={this.handleChange}
          />
          <select 
            name='work_type'
            value={this.state.work_type}
            onChange={this.handleChange}
            className='select-element'
          >
            <option value='Home Project'>Home Project</option>
            <option value='Employee'>Employee</option>
            <option value='Freelance'>Freelance</option>
          </select>
        </div>
        <div className='one-column'>
          <textarea 
            type='text'
            name='body'
            placeholder='Body'
            value={this.state.body}
            onChange={this.handleChange}
            required
          />
        </div>
      <div className='image-uploaders three-column'>
        <FormImagesHelper 
          editMode={this.state.editMode} 
          image={this.state.editMode ? this.state.thumb_image_url : this.state.thumb_image} 
          imgString='thumb_image' 
          label='Thumbnail' 
          handleDrop={this.handleThumbDrop}
          deleteImage={this.deleteImage}
          imageRef={this.thumbRef} 
        />
        <FormImagesHelper 
          editMode={this.state.editMode} 
          image={this.state.editMode ? this.state.main_image_url : this.state.main_image} 
          imgString='main_image' 
          label='Main Image' 
          handleDrop={this.handleMainImageDrop}
          deleteImage={this.deleteImage}
          imageRef={this.mainImageRef} 
        />
        <FormImagesHelper 
          editMode={this.state.editMode} 
          image={this.state.editMode ? this.state.logo_url : this.state.logo} 
          imgString='logo' 
          label='Logo' 
          handleDrop={this.handleLogoDrop}
          deleteImage={this.deleteImage}
          imageRef={this.logoRef} 
        />
      </div>
      <div className='image-button-container'>
        {this.state.thumb_image ? (
          <PortfolioClearImage removeImageFromForm={this.removeImageFromForm} image={'Thumb Image'} />
        ) : <div></div> }
        {this.state.main_image ? (
          <PortfolioClearImage removeImageFromForm={this.removeImageFromForm} image={'Main Image'} />
        ) : <div></div>  }
        {this.state.logo ? (
          <PortfolioClearImage removeImageFromForm={this.removeImageFromForm} image={'Logo'} />
        ) : <div></div>  }
      </div>
      <div className='form-button-container '>
        <button className='btn' type='submit'>Save</button>
        <a className='portfolio-warning-btn' onClick={this.clearForm}>Clear Form</a>
      </div>
      </form>
    );
  }
}