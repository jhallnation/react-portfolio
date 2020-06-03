import React, { Component } from 'react';
import axios from 'axios';

import PortfolioManagerSidebarItems from '../portfolio/portfolio-manager-sidebar-items';

export default class PortfolioManager extends Component {
  constructor() {
    super()

    this.state = {
      items: []
    }
  }

  getPortfolioItems(){
    axios
      .get('http://localhost:3000/api/portfolio')
      .then(response => {
        this.setState({
          items: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  portfolioItems() {
    return this.state.items.map(item => {
      return <PortfolioManagerSidebarItems key={item.id} item={item}/>;
    });
  }

  componentDidMount(){
    this.getPortfolioItems();
  }

  render() {
    return (
      <div className='portfolio-manager-wrapper'>
        <div className='left-column'>
          <h1>Portfolio Form</h1>
        </div>
        <div className='right-column'>
          <div className='portfolio-manager-sidebar-wrapper'>        
            {this.portfolioItems()}
          </div>
        </div>
      </div>
    );
  }
}