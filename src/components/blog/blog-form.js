import React, { Component } from 'react';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';

import RichTextEditor from  '../forms/rich-text-editor';
import FormImagesHelper from '../../helpers/form-images-helper';

export default class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      title: '',
      body: '',
      status: 'draft',
      main_image: '',

      apiURL: 'http://localhost:3000/api/blog/new',
      apiAction: 'post',

      requestHeaders: { 
        'Authorization' : localStorage.getItem('token'),
        'jhUserEmail' : localStorage.getItem('userEmail'),
      },
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleMainImageDrop = this.handleMainImageDrop.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.removeMainImageFromForm = this.removeMainImageFromForm.bind(this);

    this.mainImageRef = React.createRef();

  }

   deleteImage(imageType) {
    this.state.requestHeaders['imageToDelete'] = imageType;

    axios.delete(
      'http://localhost:3000/api/blog/delete-image',
      { 
        headers: this.state.requestHeaders
      }
    ).then(response => {
      if (response.data.delete_blog_image == false) {
         console.error('Unable to delete image');
       } else {
         this.setState({
           [`${imageType}`]: ''
         });

         this.props.handleMainImageDeletion();
       }
    }).catch(error => {
      console.error('delete image error', error);
    })
  }

  handleMouseEnter(){
    this.setState({imageClass: 'image-blur'});
  }

  handleMouseLeave(){
    this.setState({imageClass: ''});
  }

  componentWillMount() {
    if (this.props.editMode) {
      this.setState({
        id: this.props.blog.id,
        title: this.props.blog.title,
        body: this.props.blog.body,
        status: this.props.blog.status,

        apiURL: 'http://localhost:3000/api/blog/edit',
        apiAction: 'patch',

        requestHeaders: { 
          'Authorization' : localStorage.getItem('token'),
          'jhUserEmail' : localStorage.getItem('userEmail'),
          'blogPostID' : this.props.blog.id
        }
      });
    }
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
    axios({
      method: this.state.apiAction,
      url: this.state.apiURL,
      data: this.buildForm(),
      headers: this.state.requestHeaders
    })
    .then(response => {
      if (response.data.new_edit_blog != true) {
         console.error('Unable to create/edit blog');
       } else {
        if (this.props.editMode) {          
          this.props.handleUpdateFormSubmission(response.data.blog);
        } else {
          this.props.handleFormSubmission(response.data.blog);
        }
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
            <FormImagesHelper 
              editMode={this.props.editMode} 
              image={this.props.blog ? this.props.blog.main_image.url : null} 
              imgString='main_image' 
              label='Main Image' 
              handleDrop={this.handleMainImageDrop}
              deleteImage={this.deleteImage}
              imageRef={this.mainImageRef} 
            />
        </div>

        {this.state.main_image ? (
          <div className='remove-blog-image-from-form'>
            <a onClick={this.removeMainImageFromForm}>
              Remove Image
            </a>
          </div>
        ) : null }

        <div className='one-column'>
          <RichTextEditor 
            handleRichTextEditorChange={this.handleRichTextEditorChange}
            editMode={this.props.editMode}
            contentToEdit={this.props.editMode && this.props.blog.body ? this.props.blog.body : null}
          />
        </div>

        <button className='btn'>Save</button>
      </form>
    )
  }
}