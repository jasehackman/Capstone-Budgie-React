import React, { Component } from 'react'
import APICalls from './modules/APICalls.js'
import AddExpense from './AddExpense.js'
import NewItemModal from './NewItemModal.js'
import PropTypes from 'prop-types'



class ExpenseInList extends Component {
  state = {
    editName: '',
    editAmount: '',
    editDate: '',
    editnotes: '',

    edit: false,

    expense: {},
    editExpense: {}
  }

  componentDidMount() {
    this.setState({
      editExpense: this.props.expense,
      editName: this.props.expense.name,
      editAmount: this.props.expense.amount,
      editDate: this.props.expense.date,
      editnotes: this.props.expense.notes
    })
  }
  deleteExpense() {
    APICalls.delete(this.props.apiExpenses, this.props.expense.id)
      .then(() => this.props.getExpenses())
  }

  editExpense() {
    let editObject = {
      name: this.state.editName,
      amount: this.state.editAmount,
      date: this.state.editDate,
      notes: this.state.editnotes,
      category_id: this.state.editExpense.category_id,
      category: this.state.editExpense.category
    }
    APICalls.update(this.props.apiExpenses, this.props.expense.id, editObject)
      .then(expense => this.setState({
        editExpense: expense,
        edit: false
      }))
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  editToggle = () => {
    this.setState(({ edit }) => ({ edit: !edit })
    )
  }

  render() {

    // if (this.state.edit === false) {
    return (
      <div>
        <h4>{this.state.editExpense.name}</h4>
        <p>{this.state.editExpense.amount}</p>
        <p>{this.state.editExpense.date}</p>
        <p>{this.state.editExpense.notes}</p>
        <button onClick={() => { this.deleteExpense() }}>Delete</button>
        <button onClick={() => this.editToggle()}>Edit</button>
        <NewItemModal toggle={this.editToggle} modal={this.state.edit} form={<AddExpense toggle={this.editToggle} api={this.props.api} apiRefresh={this.props.getExpenses} expense={this.props.expense}/>} />

      </div>


    )
    // }
    // if (this.state.edit === true) {
    //   return (
    //     <div>
    //       <label>Expense Name</label>
    //       <input type="text" id='editName' defaultValue={this.state.editExpense.name} onChange={(e) => this.handleFieldChange(e)} />
    //       <label>Amount</label>
    //       <input type='number' id='editAmount' defaultValue={this.state.editExpense.amount} onChange={(e) => this.handleFieldChange(e)} />
    //       <label>Date</label>
    //       <input type='date' id='editDate' defaultValue={this.state.editExpense.date} onChange={(e) => this.handleFieldChange(e)} />
    //       <label>Notes</label>
    //       <input type='textfield' id='editNotes' defaultValue={this.state.editExpense.notes} onChange={(e) => this.handleFieldChange(e)} />
    //       <button onClick={() => this.editExpense()}>Save Expense</button>
    //       <button onClick={() => this.setState({ edit: false })}>Back</button>
    //     </div>


    //   )
    // }

  }
}

export default ExpenseInList


ExpenseInList.propTypes = {
  api: PropTypes.object,
  expense: PropTypes.object,
  apiExpenses: PropTypes.string,
  getExpenses: PropTypes.func
}