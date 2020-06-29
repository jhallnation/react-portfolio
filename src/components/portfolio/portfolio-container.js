import React, { Component } from 'react';
import axios from 'axios';

import PortfolioItem from './portfolio-item';

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: 'JHallNation Portfolio items',
      isLoading: false,
      items: []
    }

    this.handleFilter = this.handleFilter.bind(this);
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

  handleFilter(filter){
     this.setState({
       items: this.state.items.filter(i => {
         return i.work_type === filter;
       })
     })
  }

  portfolioItems() {
    return this.state.items.map(item => {
      return <PortfolioItem key={item.id} item={item}/>;
    });
  }

  componentDidMount(){
    this.getPortfolioItems();
  }
  render() {
    if (this.state.isLoading){
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div className='button-wrapper'>
          <button className='btn' onClick={() => this.handleFilter('Employee')}>Employee</button>
          <button className='btn' onClick={() => this.handleFilter('Freelance')}>Freelance</button>
          <button className='btn' onClick={() => this.handleFilter('Home Project')}>Home Project</button>
        </div>

        <div className='portfolio-items-wrapper'>
          {this.portfolioItems()}
        </div>

      </div>
    );
  }
}