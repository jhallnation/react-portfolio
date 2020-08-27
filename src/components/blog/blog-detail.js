import React, { Component } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import BlogMainImage from './blog-main-image';

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogPostID: this.props.match.params.slug,
      blogPost: {},
      main_image_url: ''
    }

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
    return (
      <div className='blog-container'>
        <div className='blog-wrapper'>
          <div className='blog-content'>
            <h1>{title}</h1>
              <BlogMainImage main_image={this.state.main_image_url} />
            <div className='blog-body'>
              <div>{ReactHtmlParser(body)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}