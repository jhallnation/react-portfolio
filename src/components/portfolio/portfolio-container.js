import React, { Component } from 'react';

import PortfolioItem from './portfolio-item';

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: 'JHallNation Portfolio items',
      isLoading: false,
      items: [
        {
          title:'SirsiDynix',
          description: 'Library Management System',
          role: 'Software Support Analyst',
          type: 'Employee',
          slug: 'sirsidynix'
         },
        {
          title:'Rural Data Centers',
          description: 'Dev Shop and Data Center',
          role: 'Front End Developer',
          type: 'Employee',
          slug: 'rural-data-centers'
        },
        {
          title:'IrishTacos.com',
          description: 'Tacos and Smoothies',
          role: 'Ruby on Rails Web Developer',
          type: 'Freelance',
          slug: 'irishtacos'
        },
        {
          title: 'Salution.com',
          description: 'EHR and eMAR Systems',
          role: 'Wordpress Web Developer',
          type: 'Freelance',
          slug: 'salution'
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
      return <PortfolioItem title={i.title} description={i.description} role={i.role} slug={i.slug}/>;
    });
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