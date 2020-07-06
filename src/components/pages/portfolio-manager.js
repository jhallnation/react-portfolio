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

    this.getPortfolioItems = this.getPortfolioItems.bind(this);
    this.handleUnsuccessfulFormSubmission = this.handleUnsuccessfulFormSubmission.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
  }

  handleUnsuccessfulFormSubmission(error) {
    console.error('handleUnsuccessfulFormSubmission', error);
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
        console.error(error);
      });
  }

  handleDeleteItem(id){
    axios
      .delete('http://localhost:3000/api/portfolio/delete',
        { 
          headers: { 
            'Authorization' : localStorage.getItem('token'),
            'jhUserEmail' : localStorage.getItem('userEmail'),
            'portfolioItemID' : id
          }
        }
      ).then(response => {
        if (response.data.delete_portfolio == false) {
         console.error('Unable to delete portfolio item');
       } else {
         this.getPortfolioItems();
       }
      })
      .catch(error => {
        console.error(error);
      });
  }

  portfolioItems() {
    return this.state.items.map(item => {
      return <PortfolioManagerSidebarItems key={item.id} item={item} handleDeleteItem={this.handleDeleteItem}/>;
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
            getPortfolioItems ={this.getPortfolioItems}
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