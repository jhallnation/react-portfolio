import React, { Component } from 'react';
import axios from 'axios';

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogPostID: this.props.match.params.slug,
      blogPost: {}
    }

    this.getBlogPost = this.getBlogPost.bind(this);
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
          blogPost: response.data
        });
      })
      .catch(error => {
        console.log(error);
    });
  }

  componentWillMount(){
    this.getBlogPost();
  }

  render(){
    const { title, body, main_image, status } = this.state.blogPost
    return (
      <div className='blog-container'>
        <div className='blog-wrapper'>
          <div className='blog-content'>
            <h1>{title}</h1>
            <div className='blog-main-image'>
              <img src={main_image} />
            </div>
            <div className='blog-body'>
              <div>{body}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}