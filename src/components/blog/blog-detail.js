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
    const { title, body } = this.state.blogPost
    return (
      <div>
        <h2>{title}</h2>
        <div>{body}</div>
      </div>
    );
  }
}