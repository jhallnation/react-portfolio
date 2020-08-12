import React, { Component } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('.app-wrapper');

export default class BlogModal extends Component {
  constructor(props) {
    super(props);

    this.customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%,-50%)',
        width: '800px'
      },
      overlay: {
        backgroundColor: 'rgba(1,1,1,0.75)'
      }
    }
  }

  render() {
    return (
      <ReactModal 
        onRequestClose={() => {
          this.props.handleModalClose();
        }} 
        isOpen={this.props.modalStatus} 
        style={this.customStyles}
       >
        <h1>Blog Modal</h1>
        <div>
          <a onClick={this.props.handleModalClose}>
            Cancel
          </a>
        </div>
      </ReactModal>
      )
  }
}