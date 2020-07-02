import React, { Component } from 'react';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';

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
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componenetConfig = this.componenetConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleThumbDrop = this.handleThumbDrop.bind(this);
    this.handleMainImageDrop = this.handleMainImageDrop.bind(this);
    this.handleLogoDrop = this.handleLogoDrop.bind(this);

    this.thumbRef = React.createRef();
    this.mainImageRef = React.createRef();
    this.logoRef = React.createRef();
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

  componenetConfig() {
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
    axios.post('http://localhost:3000/api/portfolio/new',
      this.buildForm(),
      { 
        headers: { 
          'Authorization' : localStorage.getItem('token'),
          'jhUserEmail' : localStorage.getItem('userEmail')
        }
      }
     ).then(response => {
       if (response.data.new_portfolio == false) {
         console.error('Unable to create portfolio');
       } else {
         this.props.getPortfolioItems();

         this.setState({
            title: '',
            subtitle: '',
            body: '',
            work_type: 'Home Project',
            main_image: '',
            thumb_image: '',
            logo: '',
            url: '',
          });

         [this.thumbRef,this.mainImageRef,this.logoRef].forEach(ref => {
           ref.current.dropzone.removeAllFiles();
         });

       }
     }).catch(error =>{
       console.log("portfolio form handle submit error", error);
     });

    event.preventDefault();
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit} className='portfolio-form-wrapper'>
        <div>
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
        <div>
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
        <div>
          <textarea 
            type='text'
            name='body'
            placeholder='Body'
            value={this.state.body}
            onChange={this.handleChange}
            required
          />
        </div>
      <div className='image-uploaders'>
        <DropzoneComponent
          ref={this.thumbRef}
          config={this.componenetConfig()}
          djsConfig={this.djsConfig()}
          eventHandlers={this.handleThumbDrop()}
         >
         </DropzoneComponent>
         <DropzoneComponent
          ref={this.mainImageRef}
          config={this.componenetConfig()}
          djsConfig={this.djsConfig()}
          eventHandlers={this.handleMainImageDrop()}
         >
         </DropzoneComponent>
         <DropzoneComponent
          ref={this.logoRef}
          config={this.componenetConfig()}
          djsConfig={this.djsConfig()}
          eventHandlers={this.handleLogoDrop()}
         >
         </DropzoneComponent>
      </div>
      <div>
        <button typte='submit'>Save</button>
      </div>
      </form>
    );
  }
}