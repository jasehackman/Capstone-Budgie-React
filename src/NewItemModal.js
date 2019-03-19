import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import PropTypes from 'prop-types'

class NewItemModal extends Component {


  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
          <ModalHeader toggle={this.props.toggle}></ModalHeader>
          <ModalBody>
            {this.props.form}
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default NewItemModal

NewItemModal.propTypes = {
  modal: PropTypes.bool,
  form: PropTypes.object,
  toggle: PropTypes.func,
}