import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import AddExpense from './AddExpense'
import PropTypes from 'prop-types'


class NewExpenseModal extends Component {


  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
          <ModalHeader toggle={this.props.toggle}>Add Expense</ModalHeader>
          <ModalBody>
            <AddExpense api={this.props.api} toggle={this.props.toggle} apiRefresh={this.props.apiRefresh} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default NewExpenseModal

NewExpenseModal.propTypes = {
 modal: PropTypes.bool
}