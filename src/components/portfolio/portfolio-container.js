import React, { Component } from 'react';

import PortfolioItem from './portfolio-item';

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: 'JHallNation Portfolio',
      items: [
        {
          title:'SirsiDynix',
          description: 'Library Management System',
          role: 'Software Support Analyst',
          type: 'Employee'
         },
        {
          title:'Rural Data Centers',
          description: 'Dev Shop and Data Center',
          role: 'Front End Developer',
          type: 'Employee'
        },
        {
          title:'IrishTacos.com',
          description: 'Tacos and Smoothies',
          role: 'Ruby on Rails Web Developer',
          type: 'Freelance'
        },
        {
          title: 'Salution.com',
          description: 'EHR and eMAR Systems',
          role: 'Wordpress Web Developer',
          type: 'Freelance'
        }
      ]
    }

    this.handleFilter = this.handleFilter.bind(this);
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
      return <PortfolioItem title={i.title} description={i.description} role={i.role} />;
    });
  }

  render() {
    return (
      <div>

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