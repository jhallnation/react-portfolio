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

    const title = this.state.portfolioItem.title;
    const subtitle = this.state.portfolioItem.subtitle;
    const body = this.state.portfolioItem.body;
    const main_image = this.state.portfolioItem.main_image ? this.state.portfolioItem.main_image.url : null;
    const thumb_image = this.state.portfolioItem.thumb_image ? this.state.portfolioItem.thumb_image.url : null;
    const logo = this.state.portfolioItem.logo ? this.state.portfolioItem.logo.url : null;
    const work_type = this.state.portfolioItem.work_type;
    const url = this.state.portfolioItem.url;

    const bannerStyles = {
      backgroundImage: 'url(' + thumb_image + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center'
    };

    return (
      <div className='portfolio-detail-wrapper'>
        <div className='banner' style={bannerStyles}>
          <div className='title'>
            <h1>{title}</h1>
            <h3>{subtitle}</h3>
          </div>
        </div>
        <div className='portfolio-detail-description-wrapper'>
          <div className='description'>
            {body}
          </div>
        </div>
        <div className='bottom-content-wrapper'>
          <a href={url} className='site-link' target='_blank'>Visit {title}</a>
        </div>
      </div>
    )
  }
}