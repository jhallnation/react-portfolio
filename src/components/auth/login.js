import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorText: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    axios.post(
      'http://localhost:3000/api/login',
      {
          email: this.state.email,
          password: this.state.password
      },
    ).then(response => {
        this.props.handleSuccessfulAuth();
        localStorage.setItem('token', response.data.authentication_token);
        localStorage.setItem('userEmail', response.data.email);
    }).catch(error => {
      if (error.response.status == 401) {
        this.setState({
          errorText: 'Incorrect admin email or password'
        });
      } else if (error.response.status == 404) {
        this.setState({
          errorText: 'Request not found'
        });        
      } else if (error.response.status == 500) {
        this.setState({
          errorText: 'Sorry, the server is unavailable'
        });         
      } else {
        this.setState({
          errorText: 'Sorry, an unexpected error has occurred'
        }); 
      }
      this.props.handleUnsuccessfulAuth();
    });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: ''  
    });
  }

  render() {
    return (
      <div className='auth-form-wrapper'>
        <h1>ADMINISTRATION DASHBOARD LOGIN</h1>

        <div>{this.state.errorText}</div>

        <form onSubmit={this.handleSubmit}>

          <input 
            type='email'
            name='email'
            placeholder='Enter your email' 
            value={this.state.email}
            onChange={this.handleChange}
          />

          <input
            type='password'
            name='password'
            placeholder='Enter your password'
            value={this.state.password}
            onChange={this.handleChange}
          />

          <div>
            <button className='btn' type='submit'>Login</button>
          </div>

        </form>
      </div>
    );
  }
}