import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BlogItem from '../blog/blog-item';

export default class Blog extends Component {
  constructor() {
    super();

    this.state = {
      blogItems: [],
      totalCount: 0,
      currentPage: 0,
      isLoading: true
    }

    this.getBlogItems = this.getBlogItems.bind(this);
    this.activateInfiniteScroll();
  }

  activateInfiniteScroll() {
    window.onscroll = () => {
      if (this.state.totalCount != this.state.blogItems.length) {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
          this.getBlogItems();
        }
      }
    }
  }

  getBlogItems() {
    axios
      .get(`http://localhost:3000/api/blog?page=${this.state.currentPage + 1}`)
      .then(response => {
        this.setState({
          blogItems: this.state.blogItems.concat(response.data.blogs),
          currentPage: this.state.currentPage + 1,
          totalCount: response.data.meta.total_blogs,
          isLoading: false
        });
        console.log(response);
      })
      .catch(error => {
        console.error(error);
        this.setState({
          isLoading: false
        })
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
      <div className='blog-container'>
        <div className='blog-wrapper'>
          <div className='blog-content'>
            {blogItems}
          </div>
          {this.state.isLoading ? (
            <div className='blog-content-loader'>
              <FontAwesomeIcon icon='spinner' spin />
            </div>
            ) : null
        }
        </div>
      </div>
    );
  }
}