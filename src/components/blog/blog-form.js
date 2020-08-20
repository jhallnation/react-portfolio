import React, { Component } from 'react';
import axios from 'axios';

import RichTextEditor from  '../forms/rich-text-editor';

export default class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      status: 'draft'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
  }

  handleRichTextEditorChange(body) {
    this.setState({ body });
  }

  buildForm() {
    let formData = new FormData();

    formData.append('blog[title]', this.state.title);
    formData.append('blog[body]', this.state.body);
    formData.append('blog[status]', this.state.status);

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

        <div className='one-column'>
          <RichTextEditor handleRichTextEditorChange={this.handleRichTextEditorChange}/>
        </div>

        <button className='btn'>Save</button>
      </form>
    )
  }
}