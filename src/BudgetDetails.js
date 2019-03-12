import React, { Component } from 'react'
import CategoryCard from './CategoryCard.js'
import { Route, Redirect } from "react-router-dom"
import { Progress } from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap'
import APICalls from './modules/APICalls.js'
import NewItemModal from './NewItemModal.js'
import BudgetForm from './forms/BudgetForm.js'
import CategoryForm from './forms/CategoryForm.js'
import PropTypes from 'prop-types'




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
    editBudgetAmount: '',
    archived: false,
    modal: false,


  }

  componentDidMount() {
    let newState = {}
    APICalls.getOne(this.props.api.budgets, this.props.match.params.budgetId)
      .then(budget => {
        newState.budget = budget
        newState.editBudgetName = budget.name
        newState.editBudgetAmount = budget.amount
        newState.archived = budget.archived
        APICalls.getWithQuery(this.props.api.categories, 'budget_id', this.props.match.params.budgetId)
          .then(categories => {
            newState.categories = categories
            this.setState(newState, () => this.setState({ loaded: true }))

          })
      }
      )
  }

  get = () => {
    APICalls.getWithQuery(this.props.api.categories, 'budget_id', this.props.match.params.budgetId)
      .then(categories => this.setState({ categories }))
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  addCategory = () => {
    let postCategory = {
      amount: this.state.newCategoryAmount,
      name: this.state.newCategoryName,
      budget: `${this.props.api.budgets}${this.props.match.params.budgetId}/`,
      budget_id: this.props.match.params.budgetId
    }

    APICalls.post(this.props.api.categories, postCategory)
      .then(() => {
        this.get()
        this.toggle()
      })

  }

  getBudget = () => {
    let newState = {}
    APICalls.getOne(this.props.api.budgets, this.props.match.params.budgetId)
      .then((budget) => {
        newState.budget = budget
        newState.editBudgetName = budget.name
        newState.editBudgetAmount = budget.amount
        newState.archived = budget.archived
        this.setState(newState)
      })
  }

  editBudget = () => {
    let putBudget = {
      amount: this.state.editBudgetAmount,
      name: this.state.editBudgetName,
      user: this.state.budget.user,
      id: this.state.budget.id
    }
    APICalls.update(this.props.api.budgets, this.state.budget.id, putBudget)
      .then(budget => this.setState({
        budget: budget,
        edit: false
      }))

  }

  toggle = () => {
    this.setState(({ modal }) => ({ modal: !modal })
    )
  }

  editToggle = () => {
    this.setState(({ edit }) => ({ edit: !edit })
    )
  }

  deleteBudget = () => {
    APICalls.delete(this.props.api.budgets, this.state.budget.id)
      .then(() => this.props.history.push('/'))
  }

  archiveBudget = () => {
    let budget = this.state.budget
    budget.archived = !this.state.archived
    APICalls.update(this.props.api.budgets, this.state.budget.id, budget)
      .then(() => {
        this.setState({ archived: !this.state.archived })
      })
  }



  render() {

    let categoryForm = (<div>
      <label>Category Name</label>
      <input type="text" id="newCategoryName" onChange={e => this.handleFieldChange(e)} />
      <label>Category Amount</label>
      <input type="number" id='newCategoryAmount' onChange={e => this.handleFieldChange(e)} />
      <button onClick={() => this.addCategory()}>Add Category</button>
    </div>)

    // budgets Details
    let budgetDetails

    let budgetEditForm = (<div>
      <label>Budget Name</label>
      <input type="text" id="editBudgetName" defaultValue={this.state.editBudgetName} onChange={e => this.handleFieldChange(e)} />
      <label>Budget Amount</label>
      <input type="number" id='editBudgetAmount' defaultValue={this.state.editBudgetAmount} onChange={e => this.handleFieldChange(e)} />
      <button onClick={() => this.editBudget()}>Edit Budget</button>
      <button onClick={() => this.editToggle()}>Back</button>
    </div>)





    budgetDetails = <div className="container">
      <div className="d-flex justify-content-around">
        <h1>{this.state.budget.name}</h1>
      </div>
      {/* Switch */}
      <div className="custom-control custom-switch">
        <input type="checkbox" className="custom-control-input" id="archived" checked={this.state.archived} onChange={() => this.archiveBudget()} />
        <label className="custom-control-label" htmlFor="archived">Archive</label>
      </div>
      <div className="d-flex justify-content-around">
        <h4>Amount Spent: {this.state.budget.spent}</h4>
        <h4>Amount Remaining: {this.state.budget.remaining}</h4>
        <h4>Total Budget: {this.state.budget.amount}</h4>

      </div>
      <NewItemModal modal={this.state.edit} toggle={this.editToggle} form={<BudgetForm toggle={this.editToggle} budget={this.state.budget} get={this.getBudget} url={this.props.api.budgets}/>} />

      <Progress value={this.state.budget.percent} />
      <button onClick={() => this.setState({ edit: true })}>Edit</button>
      <button onClick={() => this.deleteBudget()}>Delete</button>

      <button className="btn-primary" onClick={this.toggle}>Add Category</button>

      {/* Category Modal */}
      <NewItemModal modal={this.state.modal} toggle={this.toggle} getBudgets={this.getBudgets} form={<CategoryForm toggle={this.toggle} get={this.get} url={this.props.api.categories} budget={`${this.props.api.budgets}${this.props.match.params.budgetId}/`} budget_id={this.props.match.params.budgetId}/>} />
      <div className="">
        <ListGroup className="">
          {this.state.categories.map(cat => {
            return <CategoryCard category={cat} key={cat.id} get={this.get} />
          })}


        </ListGroup>
      </div>

    </div>


    if (this.state.loaded) {

      return (
        budgetDetails

      )
    }
    else {
      return <h1>Loading...</h1>
    }
  }
}

export default BudgetDetails

BudgetDetails.propTypes = {
  api: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.array,

}