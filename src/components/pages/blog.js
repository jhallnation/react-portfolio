import React, { Component } from 'react';
import axios from 'axios';

import BlogItem from '../blog/blog-item';

export default class Blog extends Component {
  constructor() {
    super();

    this.state = {
      blogItems: []
    }

    this.getBlogItems = this.getBlogItems.bind(this);
  }

  getBlogItems() {
    axios
      .get('http://localhost:3000/api/blog')
      .then(response => {
        this.setState({
          blogItems: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillMount() {
    this.getBlogItems();
  }

  render() {
    const blogItems = this.state.blogItems.map(blogItem => {
      return <BlogItem key={blogItem.id} blogItem={blogItem} />;
    });

    return (
      <div>
        {blogItems}
      </div>
    );
  }
}