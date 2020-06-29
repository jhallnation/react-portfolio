import React, { Component } from 'react';
import axios from 'axios';

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      subtitle: '',
      body: '',
      work_type: 'Home Project',
      main_image: '',
      thumb_image: '',

      //TODO
      //need to be added to schema
      logo: '',
      url: '',


    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit =this.handleSubmit.bind(this);
  }

  buildForm() {
    let formData = new FormData();

    formData.append('portfolios[title]', this.state.title);
    formData.append('portfolios[subtitle]', this.state.subtitle);
    formData.append('portfolios[body]', this.state.body);
    formData.append('portfolios[work_type]', this.state.work_type);
    // formData.append('portfolios[main_image]', this.state.main_image);
    // formData.append('portfolios[thumb_image]', this.state.thumb_image);
    // formData.append('portfolios[logo]', this.state.logo);
    // formData.append('portfolios[url]', this.state.url);

    return formData;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    axios.post('http://localhost:3000/api/portfolio/new',
      this.buildForm(),
      { 
        headers: { 
          'Authorization' : localStorage.getItem('token'),
          'jhUserEmail' : localStorage.getItem('userEmail')
        }
      }
     ).then(response => {
       if (response.data.new_portfolio == false) {
         console.error('Unable to create portfolio');
       } else {
         this.props.getPortfolioItems()
       }
     }).catch(error =>{
       console.log("portfolio form handle submit error", error);
     });

    event.preventDefault();
  }


  render() {
    return (
      <div>
        <h1>Create New Portfolio</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input 
              type='text'
              name='title'
              placeholder='Title'
              value={this.state.title}
              onChange={this.handleChange}
              required
            />
            <input 
              type='text'
              name='url'
              placeholder='URL'
              value={this.state.url}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input 
              type='text'
              name='subtitle'
              placeholder='Subttile'
              value={this.state.subtitle}
              onChange={this.handleChange}
            />
            <select 
              name='work_type'
              value={this.state.work_type}
              onChange={this.handleChange}
            >
              <option value='Home Project'>Home Project</option>
              <option value='Employee'>Employee</option>
              <option value='Freelance'>Freelance</option>
            </select>
          </div>
          <div>
            <textarea 
              type='text'
              name='body'
              placeholder='Body'
              value={this.state.body}
              onChange={this.handleChange}
              required
            />
          </div>
{/*          <div>
            <input 
              type='text'
              name='main_image'
              placeholder='Main Image'
              value={this.state.main_image}
              onChange={this.handleChange}
            />
            <input 
              type='text'
              name='thumb_image'
              placeholder='Thumb Image'
              value={this.state.thumb_image}
              onChange={this.handleChange}
            />
            <input 
              type='text'
              name='logo'
              placeholder='Logo'
              value={this.state.logo}
              onChange={this.handleChange}
            />
          </div>
*/}
        <div>
          <button typte='submit'>Save</button>
        </div>
        </form>
      </div>  
    );
  }
}