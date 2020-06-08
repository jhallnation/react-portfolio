import React, { Component } from 'react';
import axios from 'axios';

import PortfolioManagerSidebarItems from '../portfolio/portfolio-manager-sidebar-items';
import PortfolioForm from '../portfolio/portfolio-form';

export default class PortfolioManager extends Component {
  constructor() {
    super()

    this.state = {
      items: []
    }

    this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
    this.handleUnsuccessfulFormSubmission = this.handleUnsuccessfulFormSubmission.bind(this);
  }

  handleSuccessfulFormSubmission(portfolioItem) {
    //TODO
    //update items state
    //add portfolioItem to items state list
  }

  handleUnsuccessfulFormSubmission(error) {
    console.log('handleUnsuccessfulFormSubmission', error);
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
          <PortfolioForm 
            handleSuccessfulFormSubmission ={this.handleSuccessfulFormSubmission}
            handleUnsuccessfulFormSubmission ={this.handleUnsuccessfulFormSubmission}
          />
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