import React, { Component } from 'react';
import APICalls from './modules/APICalls'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// TODO:Turn this into a modal
// TODO: Clear forms when you hit submit

class AddExpense extends Component {

  state = {
    budgets: [],
    categories: [],
    categoryChoice: '',
    newExpenseName: '',
    newExpenseAmount: '',
    newExpenseDate: '',
    newExpenseNotes: ''



  }


  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  componentDidMount() {
    APICalls.getWithURL(this.props.api.budgets)
      .then(budgets => this.setState({ budgets }))
  }

  getBudgetCategories(id) {
    if (id === "0") {
      return
    }

    let url = `${this.props.api.categories}?budget_id=${id}`

    fetch(`${this.props.api.categories}?budget_id=${id}`)
      .then(data => data.json())
      .then(categories => this.setState({ categories }))
  }

  addCategoryForm() {
    let form
    if (this.state.categories.length > 0) {

      form = <>
        <FormGroup>
        <Label>Pick Which Category</Label>
        <Input type="select" id="categoryChoice" onChange={(e) => this.handleFieldChange(e)}>
          <option value="0">Default</option>
          {this.state.categories.map(category => {
            return <option key={category.id} value={category.id}>{category.name}</option>
          })}


        </Input>
        </FormGroup>
      </>

    }
    return form
  }

  addExpense() {
    let expenseToAdd = {
      name: this.state.newExpenseName,
      amount: this.state.newExpenseAmount,
      date: this.state.newExpenseDate,
      notes: this.state.newExpenseNotes,
      category_id: this.state.categoryChoice,
      category: `${this.props.api.categories}${this.state.categoryChoice}`
    }
    console.log(expenseToAdd)
    fetch(this.props.api.expenses, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(expenseToAdd)
    }).then(()=> {
      this.props.toggle()
      this.props.apiRefresh()
    }
      )

  }

  // TODO: if an expense doesn't have a category nothign is going to happen
  // TODO: if they go back and select defult it will break
  // TODO: Add Form Validation
  addExpenseForms() {
    let form;
    if (this.state.categoryChoice != '') {
      form = <>
        <FormGroup>
        <Label>Expense Name</Label>
        <Input type="text" id='newExpenseName' onChange={(e) => this.handleFieldChange(e)} />
        </FormGroup>

        <FormGroup>
        <Label>Amount</Label>
        <Input type='number' id='newExpenseAmount' onChange={(e) => this.handleFieldChange(e)} />
        </FormGroup>

        <FormGroup>
        <Label>Date</Label>
        <Input type='date' id='newExpenseDate' onChange={(e) => this.handleFieldChange(e)} />
        </FormGroup>

        <FormGroup>
        <Label>Notes</Label>
        <Input type='textfield' id='newExpenseNotes' onChange={(e) => this.handleFieldChange(e)} />
        </FormGroup>

        <button onClick={() => this.addExpense()}>Add Expense</button>

      </>
    }
    return form
  }

  render() {


    return (
      <Form >
        <FormGroup>
        <Label>Pick Which Budget:</Label>
        <Input type="select" onChange={(e) => this.getBudgetCategories(e.target.value)}>
          <option value="0">Default</option>
          {this.state.budgets.map(budget => {
            return <option key={budget.id} value={budget.id}>{budget.name}</option>

          })}


        </Input>
        </FormGroup>
        {this.addCategoryForm()}
        {this.addExpenseForms()}


      </Form>
    );
  }
}

export default AddExpense;
