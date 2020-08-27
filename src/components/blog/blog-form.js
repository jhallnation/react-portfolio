import React, { Component } from 'react';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';

import RichTextEditor from  '../forms/rich-text-editor';

export default class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      status: 'draft',
      main_image: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleMainImageDrop = this.handleMainImageDrop.bind(this);

    this.mainImageRef = React.createRef();

    this.removeMainImageFromForm = this.removeMainImageFromForm.bind(this);
  }

  removeMainImageFromForm(){
    this.mainImageRef.current.dropzone.removeAllFiles();
    this.setState({ main_image: ''});
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
      // addRemoveLinks: true,
      maxFiles: 1
    }
  }

  handleMainImageDrop() {
    return {
      addedfile: file => this.setState({
        main_image: file
      })
    };
  }

  handleRichTextEditorChange(body) {
    this.setState({ body });
  }

  buildForm() {
    let formData = new FormData();

    formData.append('blog[title]', this.state.title);
    formData.append('blog[body]', this.state.body);
    formData.append('blog[status]', this.state.status);

    if (this.state.main_image) {
      formData.append('blog[main_image]', this.state.main_image);
    }

    return formData;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    axios.post(
      'http://localhost:3000/api/blog/new',
      this.buildForm(),
      { 
        headers: { 
          'Authorization' : localStorage.getItem('token'),
          'jhUserEmail' : localStorage.getItem('userEmail')
        }
      }
    ).then(response => {
      if (response.data.new_edit_blog == false) {
         console.error('Unable to create/edit blog');
       } else {
        this.props.handleFormSubmission(response.data.blog);
      }
    }).catch(error => {
      console.error('Blog handleSubmit', error);
    })

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='blog-form-wrapper'>
        <input 
          onChange={this.handleChange} 
          type='text' 
          name='title'
          placeholder='Blog Title'
          value={this.state.title}
        />
        <select 
          name='status'
          value={this.state.status}
          onChange={this.handleChange}
        >
          <option value='draft'>Draft</option>
          <option value='published'>Published</option>
        </select>

        <div className='image-uploaders'>
        <DropzoneComponent
            config={this.componentConfig()}
            djsConfig={this.djsConfig()}
            eventHandlers={this.handleMainImageDrop()}
            ref={this.mainImageRef}
          >
            <div className='dz-message'>Main Image</div>
          </DropzoneComponent>
        </div>

        {this.state.main_image ? (
          <div className='remove-blog-image-from-form'>
            <a onClick={this.removeMainImageFromForm}>
              Remove Image
            </a>
          </div>
        ) : null }

        <div className='one-column'>
          <RichTextEditor handleRichTextEditorChange={this.handleRichTextEditorChange}/>
        </div>

        <button className='btn'>Save</button>
      </form>
    )
  }
}