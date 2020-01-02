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
      .get('http://localhost:3000/api')
      .then(response => {
        console.log(response);
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