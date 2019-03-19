import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
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

            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalBody>

        </Modal>
      </div>
    )
  }
}

export default NewExpenseModal

NewExpenseModal.propTypes = {
  modal: PropTypes.bool,
  api: PropTypes.object,
  toggle: PropTypes.func,
  apiRefresh: PropTypes.func
}