import React, { Component } from 'react';
import APICalls from './modules/APICalls'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import PropTypes from 'prop-types'
import { debug } from 'util';



class AddExpense extends Component {

  state = {
    budgets: [],
    categories: [],
    categoryChoice: null,
    expenseName: '',
    expenseAmount: '',
    expenseDate: '',
    expenseNote: '',
    budgetDefault: null,
    categoryDefault: ''

  }


  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  componentDidMount() {
    if (this.props.expense) {
      console.log(this.props.expense)
      const expense = {
        expenseName: this.props.expense.name,
        expenseAmount: this.props.expense.amount,
        expenseDate: this.props.expense.date,
        expenseNote: this.props.expense.notes,
        categoryChoice: this.props.expense.category_id
      }
      this.setState(expense, () => {
        this.categoryDefault()
        this.getBudgetCategories(this.state.categoryChoice)
      })
      APICalls.get(this.props.api.budgets)
        .then(budgets => this.setState({ budgets }))

    } else {
      APICalls.get(this.props.api.budgets)
        .then(budgets => {
          this.setState({ budgets }, () => this.categoryDefault())

        })
    }
  }

  categoryDefault() {
    if (this.props.expense) {
      console.log("top if")
      return APICalls.getOne(this.props.api.categories, this.state.categoryChoice)
        .then(category => {
          this.setState({ categoryDefault: <option value={this.state.categoryChoice}>{category.name}</option> })
          return APICalls.getOneWithUrl(category.budget)
            .then(budget => {
              this.setState({ budgetDefault: <option value={budget.id}>{budget.name}</option> })
            })
        })
    }
    else {
      console.log("bottom if")
      this.setState({ categoryDefault: <option value="0">Default</option> }, ()=> this.state.categoryDefault)
      this.setState({
        budgetDefault: <option value="0">Default</option>
      })

    }
  }

  getBudgetCategories(id) {
    if (id === '0') {
      return
    }
    APICalls.getWithQuery(this.props.api.categories, 'budget_id', id)
      .then(categories => this.setState({ categories }))
  }

  addCategoryForm() {
    let form
    if (this.state.categories.length > 0) {

      form = <>
        <FormGroup>
          <Label>Pick Which Category</Label>
          <Input type="select" id="categoryChoice" onChange={(e) => this.handleFieldChange(e)}>
            {this.state.categoryDefault}
            {this.state.categories.map(category => {
              return <option key={category.id} value={category.id}>{category.name}</option>
            })}


          </Input>
        </FormGroup>
      </>
    }
    // TODO: SHow a warning when a budget doesn't have categories
    else if(this.state.categories < 1 && this.state.categoryChoice !== null){
      form= <p className="alert alert-danger">This budget has no categories. Expense cannont be added.</p>

    }
    return form
  }

  noCategories(){
    if(this.state.categories < 1){
      return <p className="danger">This budget has no categories. Expense cannont be added.</p>
    }
  }

  addExpense() {
    if (this.props.expense) {
      let expense = {
        name: this.state.expenseName,
        amount: this.state.expenseAmount,
        date: this.state.expenseDate,
        notes: this.state.expenseNote,
        category_id: this.state.categoryChoice,
        category: `${this.props.api.categories}${this.state.categoryChoice}`
      }
      APICalls.update(this.props.api.expenses, this.props.expense.id, expense)
        .then(() => {
          this.props.toggle()
          this.props.apiRefresh()
        })

    } else {

      let expense = {
        name: this.state.expenseName,
        amount: this.state.expenseAmount,
        date: this.state.expenseDate,
        notes: this.state.expenseNote,
        category_id: this.state.categoryChoice,
        category: `${this.props.api.categories}${this.state.categoryChoice}`
      }

      APICalls.post(this.props.api.expenses, expense)
        .then(() => {
          this.props.toggle()
          this.props.apiRefresh()
        }
        )
    }
  }

  // TODO: if an expense doesn't have a category nothign is going to happen
  // TODO: if they go back and select defult it will break
  // TODO: Add Form Validation
  addExpenseForms() {
    let form
    if (this.state.categoryChoice != null) {
      form = <>
        <FormGroup>
          <Label>Expense Name</Label>
          <Input type="text" id='expenseName' defaultValue={this.state.expenseName} onChange={(e) => this.handleFieldChange(e)} />
        </FormGroup>

        <FormGroup>
          <Label>Amount</Label>
          <Input type='number' id='expenseAmount' defaultValue={this.state.expenseAmount} onChange={(e) => this.handleFieldChange(e)} />
        </FormGroup>

        <FormGroup>
          <Label>Date</Label>
          <Input type='date' id='expenseDate' defaultValue={this.state.expenseDate} onChange={(e) => this.handleFieldChange(e)} />
        </FormGroup>

        <FormGroup>
          <Label>Notes</Label>
          <Input type='textfield' id='expenseNote' defaultValue={this.state.expenseNote} onChange={(e) => this.handleFieldChange(e)} />
        </FormGroup>

        <button onClick={() => this.addExpense()}>Save</button>

      </>
    }
    return form
  }

  render() {

    if (this.state.budgetDefault) {
      return (
        <Form >
          <FormGroup>
            <Label>Pick Which Budget:</Label>
            <Input type="select" onChange={(e) => this.getBudgetCategories(e.target.value)}>
              {this.state.budgetDefault}
              {this.state.budgets.map(budget => {
                return <option key={budget.id} value={budget.id}>{budget.name}</option>

              })}


            </Input>
          </FormGroup>
          {this.addCategoryForm()}
          {this.addExpenseForms()}


        </Form>
      )
    }else{
      return <p>loading</p>
    }
  }
}

export default AddExpense

AddExpense.propTypes = {
  api: PropTypes.object,
  apiRefresh: PropTypes.func,
  toggle: PropTypes.func,
  expense: PropTypes.object

}