import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PortfolioItem extends Component {
  constructor(props){
    super(props);

    this.state = {
      portfolioItemClass: ''
    };
  }
      // Data tgat I'll need
    // - background image: thumb_image_url
    // - logo: logo_url
    // - id: id
    // - url: url NOT in schema, needs to be added
    // ["id", "name", "description", "url", "category", "position", "thumb_image_url", "banner_image_url", "logo_url", "column_names_merged_with_images"]

  handleMouseEnter(){
    this.setState({portfolioItemClass: 'image-blur'});
  }

  handleMouseLeave(){
    this.setState({portfolioItemClass: ''});
  }

  render(){
    const { title, subtitle, body, thumb_image, id } = this.props.item;
    return (
      <div 
        className='portfolio-item-wrapper '
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
       >
        <div
          className={'portfolio-img-background ' + this.state.portfolioItemClass}
          style={{
            backgroundImage: 'url(' + thumb_image.url + ')'
          }}
        />

        <div className='img-text-wrapper'>
          <div className='title-wrapper'>{title}</div>
          <div className='subtitle'>{subtitle}</div>
        </div>
        {/* <h3>{url}</h3> not currently in portfolio table */}
        {/* <Link to={`/portfolio/${id}`}>Link</Link> */}
       
      </div>
    )
  }
}