import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import PropTypes from 'prop-types'

class NewItemModal extends Component {


  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
          <ModalHeader toggle={this.props.toggle}>Add Expense</ModalHeader>
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
  modal: PropTypes.object,
  form: PropTypes.object,
  toggle: PropTypes.func,

}