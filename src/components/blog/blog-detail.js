import React, { Component } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import BlogMainImage from './blog-main-image';
import BlogForm from './blog-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogPostID: this.props.match.params.slug,
      blogPost: {},
      main_image_url: '',
      editMode: false
    }

    this.handleEditClick = this.handleEditClick.bind(this);
    this.getBlogPost = this.getBlogPost.bind(this);
    this.handleMainImageDeletion = this.handleMainImageDeletion.bind(this);
    this.handleUpdateFormSubmission = this.handleUpdateFormSubmission.bind(this);
    this.handleCloseForm = this.handleCloseForm.bind(this);
  }

  handleCloseForm() {
    this.setState({
      editMode: false
    })
  }

  handleUpdateFormSubmission(blog) {
    this.setState({
      blogPost: blog,
      main_image_url: blog.main_image.url,
      editMode: false
    })
  }

  handleMainImageDeletion() {
    this.setState({
      blogPost: {
        main_image: ''
      }
    })
  }

  handleEditClick() {
    this.setState({ editMode: true });
  }

  getBlogPost() {
    axios
      .get('http://localhost:3000/api/blog/post',
        { 
          headers: { 
            'blogPostID' : this.state.blogPostID
          }
        })
      .then(response => {
        this.setState({
          blogPost: response.data,
          main_image_url: response.data.main_image.url
        });
      })
      .catch(error => {
        console.log(error);
    });
  }

  componentDidMount(){
    this.getBlogPost();
  }

  render(){
    const { title, body, main_image, status } = this.state.blogPost;

    const contentManager = () => {
      if (this.state.editMode && this.props.loggedInStatus === 'LOGGED_IN') {
        return <div>
                <BlogForm 
                  editMode={this.state.editMode} 
                  blog={this.state.blogPost} 
                  handleMainImageDeletion={this.handleMainImageDeletion}
                  handleUpdateFormSubmission={this.handleUpdateFormSubmission}
                />
                <div className='close-blog-form'>
                  <a onClick={this.handleCloseForm}>
                    Cancel
                  </a>
                </div>
              </div>
      } else { 
        return (         
          <div className='blog-content'>
            <div className='blog-detail-title-container'>
              <h1>{title}</h1>
              {this.props.loggedInStatus === 'LOGGED_IN' ? (
                <a className='action-icon edit-item' onClick={this.handleEditClick}>
                  <FontAwesomeIcon icon='edit' />
                </a>
              ) : null }
            </div>
              <BlogMainImage main_image={this.state.main_image_url} />
            <div className='blog-body'>
              <div>{ReactHtmlParser(body)}</div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className='blog-container'>
        <div className='blog-wrapper'>
          {contentManager()} 
        </div>
      </div>
    );
  }
}