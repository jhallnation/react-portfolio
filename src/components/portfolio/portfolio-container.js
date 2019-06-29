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
      .get('https://jhall.devcamp.space/portfolio/portfolio_items')
      .then(response => {
        console.log(response);
        this.setState({
          items: response.data.portfolio_items
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleFilter(filter){
     this.setState({
       items: this.state.items.filter(i => {
         return i.type === filter;
       })
     })
  }

  portfolioItems() {
    return this.state.items.map(i => {
      return <PortfolioItem title={i.name} description={i.description} role={i.url} slug={i.id}/>;
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
        <br />
        <h2>{this.state.pageTitle}</h2>

        <br />
        <button onClick={() => this.handleFilter('Employee')}>Employee</button>
        <button onClick={() => this.handleFilter('Freelance')}>Freelance</button>
        <hr />
        <br />

        {this.portfolioItems()}

      </div>
    );
  }
}