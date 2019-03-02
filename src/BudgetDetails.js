import React, { Component } from 'react';
import CategoryCard from './CategoryCard.js';
import { Route, Redirect } from "react-router-dom";
import { Progress } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';


class BudgetDetails extends Component {

  state = {
    budget: [],
    categories: [],
    loaded: false,

    // for new Category
    newCategoryName: '',
    newCategoryAmount: 0,
    // Edit Budget
    edit: false,
    editBudgetName: '',
    editBudgetAmount: ''


  }

  componentDidMount() {
    let newState = {}
    fetch(`${this.props.api.budgets}${this.props.match.params.budgetId}`)
      .then(data => data.json())
      .then(budget => {
        console.log("budget", budget)
        newState.budget = budget
        newState.editBudgetName = budget.name
        newState.editBudgetAmount = budget.amount
        fetch(`${this.props.api.categories}?budget_id=${this.props.match.params.budgetId}`)
          .then(data => data.json())
          .then(categories => {
            console.log("categories", categories)
            newState.categories = categories
            console.log("newState", newState)
            this.setState(newState)
            this.setState({ loaded: true })
          })
      }
      )
  }

  getCategories = () => {
    fetch(`${this.props.api.categories}?budget_id=${this.props.match.params.budgetId}`)
      .then(data => data.json())
      .then(categories => this.setState({ categories }))
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  addCategory() {
    let postCategory = {
      amount: this.state.newCategoryAmount,
      name: this.state.newCategoryName,
      budget: `${this.props.api.budgets}${this.props.match.params.budgetId}/`,
      budget_id: this.props.match.params.budgetId
    }
    fetch(this.props.api.categories, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postCategory)
    }).then(() => this.getCategories())

  }





  editBudget() {
    let putBudget = {
      amount: this.state.editBudgetAmount,
      name: this.state.editBudgetName,
      user: this.state.budget.user,
      id: this.state.budget.id
    }
    fetch(`${this.props.api.budgets}${this.state.budget.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(putBudget)
    }).then((data) => data.json())
      .then(budget => this.setState({
        budget: budget,
        edit: false
      }))

  }

  deleteBudget() {
    fetch(`${this.props.api.budgets}${this.state.budget.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }
    ).then(() => this.props.history.push('/'))
  }




  render() {

    let newCategoryForm = (<div>
      <label>Category Name</label>
      <input type="text" id="newCategoryName" onChange={e => this.handleFieldChange(e)} />
      <label>Category Amount</label>
      <input type="number" id='newCategoryAmount' onChange={e => this.handleFieldChange(e)} />
      <button onClick={() => this.addCategory()}>Add Category</button>
    </div>)

    // budgets Details
    let budgetDetails
    if (this.state.edit) {
      budgetDetails = (<div>
        <label>Budget Name</label>
        <input type="text" id="editBudgetName" defaultValue={this.state.editBudgetName} onChange={e => this.handleFieldChange(e)} />
        <label>Budget Amount</label>
        <input type="number" id='editBudgetAmount' defaultValue={this.state.editBudgetAmount} onChange={e => this.handleFieldChange(e)} />
        <button onClick={() => this.editBudget()}>Edit Budget</button>
        <button onClick={() => this.setState({ edit: false })}>Back</button>
      </div>)
    } else {
      budgetDetails = <div className="container">
        <div className="d-flex justify-content-around">
        <h1>{this.state.budget.name}</h1>
        </div>
        <div className="d-flex justify-content-around">
        <h4>Amount Spent: {this.state.budget.spent}</h4>
        <h4>Amount Remaining: {this.state.budget.remaining}</h4>
        <h4>Total Budget: {this.state.budget.amount}</h4>

        </div>

        <Progress value={this.state.budget.percent}/>
        <button onClick={() => this.setState({ edit: true })}>Edit</button>
        <button onClick={() => this.deleteBudget()}>Delete</button>
        {newCategoryForm}
        <div className="">
        <ListGroup className="">
          {this.state.categories.map(cat => {
            return <CategoryCard category={cat} key={cat.id} getCategories={this.getCategories} />
          })}


        </ListGroup>
        </div>

      </div>
    }

    if (this.state.loaded) {

      return (budgetDetails

      );
    }
    else {
      return <h1>Loading...</h1>
    }
  }
}

export default BudgetDetails;
