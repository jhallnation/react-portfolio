import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

const NavigationComponent = (props => {

  const dynamicLink = (route, linkText) => {
    return(
      <div className='nav-link-wrapper'>
        <NavLink exact to={route} activeClassName='nav-link-active'>{linkText}</NavLink>
      </div>
    );
  };

  const handleLogout = () => {
    axios.delete(
      'http://localhost:3000/api/logout',
      {
       headers: { 
          'jhUserEmail' : localStorage.getItem('userEmail')
        }
      }
    ).then(response =>{
      if (response.status === 200) {
        localStorage.setItem('token', '');
        localStorage.setItem('userEmail', '');
        props.history.push('/');
        props.handleSuccessfulLogout();
      }
      return response.data;
    }).catch(error => {
      console.log('Error on logout', error);
    });
  };

  return(
    <div className='nav-wrapper'>
      <div className='left-side'>

        {dynamicLink('/', 'Home')}

        {dynamicLink('/about-me', 'About Me')}

        {dynamicLink('/contact', 'Contact')}

        {props.loggedInStatus === 'LOGGED_IN' ? dynamicLink('/blog', 'Blog') : null}

      </div>

      <div className='right-side'>
        <div>
          JASON HALL
          {props.loggedInStatus === 'LOGGED_IN' ? (<a onClick={handleLogout}>Logout</a>) : null}
        </div>
      </div>
      
    </div>
   );
  }
)

export default withRouter(NavigationComponent);