import React, { Component } from 'react';
import axios from 'axios';

export default class PortfolioDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioItemID: this.props.match.params.slug,
      portfolioItem: {}
    }

    this.getPortfolioItem = this.getPortfolioItem.bind(this);
  }

   getPortfolioItem() {
    axios
      .get('http://localhost:3000/api/portfolio/item',
        { 
          headers: { 
            'portfolioItemID' : this.state.portfolioItemID
          }
        })
      .then(response => {
        this.setState({
          portfolioItem: response.data,
        });
      })
      .catch(error => {
        console.log(error);
    });
  }

  componentDidMount(){
    this.getPortfolioItem();
  }

  render() {
    const { title, subtitle, body, main_image, thumb_image, logo, work_type, url } = this.state.portfolioItem;

    return (
      <div>
        <h2>Portfolio Detail for {this.props.match.params.slug}</h2>
        <h1>{title}</h1>
      </div>
    )
  }
}