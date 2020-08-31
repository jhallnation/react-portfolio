import React, { Component } from 'react';

export default class PortfolioClearImage extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.removeImageFromForm(this.props.image);
  }

  render() {
    return (
      <a className='portfolio-warning-btn ' onClick={this.handleClick}>
        Remove {this.props.image}
      </a>
    )
  }
}