import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BlogItem from '../blog/blog-item';
import BlogModal from '../modals/blog-modal';

export default class Blog extends Component {
  constructor() {
    super();

    this.state = {
      blogItems: [],
      totalCount: 0,
      currentPage: 0,
      isLoading: true,
      modalStatus: false
    }

    this.getBlogItems = this.getBlogItems.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.createNewBlogLink = this.createNewBlogLink.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSuccessfulNewBlogCreation = this.handleSuccessfulNewBlogCreation.bind(this);
    this.handleDeleteClick = this. handleDeleteClick.bind(this);
    this.refreshBlogList = this.refreshBlogList.bind(this);

    window.addEventListener('scroll', this.onScroll, false);
  }

  handleDeleteClick(id) {
    axios
      .delete('http://localhost:3000/api/blog/delete',
        { 
          headers: { 
            'Authorization' : localStorage.getItem('token'),
            'jhUserEmail' : localStorage.getItem('userEmail'),
            'blogPostID' : id
          }
        }
      ).then(response => {
        if (response.data.delete_blog == false) {
         console.error('Unable to delete blog post');
        } else {
          this.refreshBlogList();
        }
      })
      .catch(error => {
        console.error(error);
      }
    );
  }

  refreshBlogList(){
    this.setState({
      blogItems: [],
      totalCount: 0,
      currentPage: 0,
      isLoading: true,
      modalStatus: false
    });
    this.getBlogItems();
  }

  handleSuccessfulNewBlogCreation(blog) {
    this.refreshBlogList();
  }

  onScroll() {
    if (this.state.totalCount != this.state.blogItems.length) {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        this.getBlogItems();
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
      })
      .catch(error => {
        console.error('getBlogItems', error);
        this.setState({
          isLoading: false
        })
      });
  }

  createNewBlogLink() {
    this.setState({
      modalStatus: true
    });
  }

  handleModalClose() {
    this.setState({
      modalStatus: false
    });
  }

  componentWillMount() {
    this.getBlogItems();
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.onScroll, false);
  }

  render() {
    const blogItems = this.state.blogItems.map(blogItem => {
      return <BlogItem key={blogItem.id} blogItem={blogItem} loggedInStatus={this.props.loggedInStatus} handleDeleteClick={this.handleDeleteClick}/>;
    });

    return (
      <div className='blog-container'>
        <BlogModal 
          modalStatus={this.state.modalStatus} 
          handleModalClose={this.handleModalClose} 
          handleSuccessfulNewBlogCreation={this.handleSuccessfulNewBlogCreation}
        />

        {this.props.loggedInStatus === 'LOGGED_IN' ? (
          <div className='new-blog-link'>
            <a onClick={this.createNewBlogLink}>
              <FontAwesomeIcon icon='plus-square' /> Create New Blog
            </a>
          </div>
          ) : null
        }
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