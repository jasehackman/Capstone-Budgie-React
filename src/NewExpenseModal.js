import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddExpense from './AddExpense'

class NewExpenseModal extends Component {





render() {
  return (
    <div>
      {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
        <ModalHeader toggle={this.props.toggle}>Add Expense</ModalHeader>
        <ModalBody>
          <AddExpense api={this.props.api} toggle={this.props.toggle} apiRefresh={this.props.apiRefresh}/>


          </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={this.props.toggle}>Save</Button>{' '} */}
          <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
}

export default NewExpenseModal;