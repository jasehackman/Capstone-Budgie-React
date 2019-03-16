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

    return (
      <li className='list-group-item'>
        <div className='row'>
          <div className='col'>
            <h4>{this.state.editExpense.name}</h4>
          </div>
          <div className='col'>
            <p>{this.state.editExpense.amount}</p>
          </div>
          <div className='col'>
            <p>{this.state.editExpense.date}</p>
          </div>
          <div className='col'>
            <p>{this.state.editExpense.notes}</p>
          </div>
          <div className='col'>
            <i className="fas fa-trash-alt m-1" onClick={() => { this.deleteExpense() }}/>
            <i className="fas fa-pencil-alt m-1" onClick={() => this.editToggle()}/>
          </div>
        </div>
        <NewItemModal toggle={this.editToggle} modal={this.state.edit} form={<AddExpense toggle={this.editToggle} api={this.props.api} apiRefresh={this.props.getExpenses} expense={this.props.expense} />} />

      </li>


    )


  }
}

export default ExpenseInList


ExpenseInList.propTypes = {
  api: PropTypes.object,
  expense: PropTypes.object,
  apiExpenses: PropTypes.string,
  getExpenses: PropTypes.func
}