import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesome } from '@fortawesome/react-fontawesome';
import { faTrash, faSignOutAlt, faEdit, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';

import NavigationComponent from './navigation/navigation-container';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/blog';
import BlogDetail from './blog/blog-detail';
import PortfolioDetail from './portfolio/portfolio-detail';
import PortfolioManager from './pages/portfolio-manager';
import Auth from './pages/auth';
import NoMatch from './pages/no-match';

library.add(faTrash,faSignOutAlt,faEdit,faTimes, faSpinner);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN'
    };

    this.handleSuccessfulLogin =this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin =this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout =this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: 'LOGGED_IN'
    })
  }  

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN'
    })
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN'
    })
  }

  checkLoginStatus() {
    return axios.get(
      'http://localhost:3000/api/logged_in',
      { 
        headers: { 
          'Authorization' : localStorage.getItem('token'),
          'jhUserEmail' : localStorage.getItem('userEmail')
        }
      }
    ).then(response => {
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;

      if (loggedIn && loggedInStatus === 'LOGGED_IN') {
        return loggedIn;
      } else if (loggedIn && loggedInStatus === 'NOT_LOGGED_IN') {
        this.setState({
          loggedInStatus: 'LOGGED_IN'
        });
      } else if (!loggedIn && loggedInStatus === 'LOGGED_IN') {
          this.setState({
            loggedInStatus: 'NOT_LOGGED_IN'
        });
      }
    }).catch(error =>{
      console.log('Error', error);
    });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [
      <Route key='portfolio-manager' path='/portfolio-manager' component={ PortfolioManager } /> 
    ]
  }

  render() {
    return (
      <div className='container'>   

        <Router>
          <div>

            <NavigationComponent 
              loggedInStatus={this.state.loggedInStatus}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />

            <Switch>
              <Route exact path='/' component={ Home } /> 
              <Route 
                path='/auth' 
                render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                   />
                )} 
              /> 
              <Route path='/about-me' component={ About } />  
              <Route path='/contact' component={ Contact } />
              <Route path='/blog-posts' component={ Blog } />

              <Route path='/blog-post/:slug' component={ BlogDetail } />  

              {/* prevents ability to go directly to page by typing url into the browser, if logged out */}
              {this.state.loggedInStatus === 'LOGGED_IN' ? this.authorizedPages() : null}

              <Route exact path='/portfolio/:slug' component={ PortfolioDetail } />  
              <Route component={ NoMatch } />  
            </Switch>
          </div>
        </Router>
        
      </div>
    );
  }
}
