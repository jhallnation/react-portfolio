import React, { Component } from 'react';

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      subtitle: '',
      body: '',
      work_type: '',
      main_image: '',
      thumb_image: '',

      //TODO
      //need to be added to schema
      logo: '',
      url: '',


    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    //TODO
  }


  render() {
    return (
      <div>
        <h1>Create New Portfolio</h1>

        <form>
          <div>
            <input 
              type='text'
              name='title'
              placeholder='Title'
              value={this.state.title}
              onChange={this.handleChange}
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
            <input 
              type='text'
              name='work_type'
              placeholder='Employment Type'
              value={this.state.work_type}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input 
              type='text'
              name='body'
              placeholder='Body'
              value={this.state.body}
              onChange={this.handleChange}
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