import React, { Component } from 'react'
import CategoryCard from './CategoryCard.js'
import { Progress } from 'reactstrap'
import { ListGroup } from 'reactstrap'
import APICalls from '../modules/APICalls.js'
import NewItemModal from '../NewItemModal.js'
import BudgetForm from '../forms/BudgetForm.js'
import CategoryForm from '../forms/CategoryForm.js'
import PropTypes from 'prop-types'
import BudgetList from './BudgetList.js'
import BudgetBalancing from './BudgetBalancing.js'




class BudgetDetails extends Component {

  state = {
    budget: [],
    categories: [],
    loaded: false,
    budgets: [],

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


  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getBoth()
    }
  }
  getAllActiveBudgets = () => {
    // used to update state and re render BudgetList
    APICalls.getWithQuery(this.props.api.budgets, 'archived', false)
      .then(budgets => this.setState({ budgets }))
  }

  getCategories = () => {
    APICalls.getWithQuery(this.props.api.categories, 'budget_id', this.props.match.params.budgetId)
      .then(categories => this.setState({ categories }))
  }

  getBoth = () => {
    // combines gets for when more than one need to be called
    this.getCategories()
    this.getBudget()
    this.getAllActiveBudgets()

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
        this.getCategories()
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
        this.setState(newState, () => this.setState({ loaded: true }))
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
    if (this.state.modal === true) {
      this.setState(({ modal }) => ({
        modal: !modal,
        loaded: false
      })
      )
    } else {
      this.setState(({ modal }) => ({
        modal: !modal
      }))

    }

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
        this.setState({ archived: !this.state.archived }, () => this.getBoth())
      })
  }

  progress = () =>{
    //defines color of progress bar
    let progressBar
    if(this.state.budget.percent <= 95){
      progressBar = <Progress value={this.state.budget.percent} />
    }else if(this.state.budget.percent <= 100){
      progressBar = <Progress color="warning" value={this.state.budget.percent} />
    }else if(this.state.budget.percent > 100){
      progressBar = <Progress color="danger" value={this.state.budget.percent} />
    }
    return progressBar
  }


  render() {


    // budgets Details
    let budgetDetails
    budgetDetails = <div className="container main ">
      <div className="card p-4 ">
        <div className="relative">
          <div className="left">
            <button className="btn btn-primary" onClick={this.toggle}>+ Category</button>
          </div>
          <div className="d-flex justify-content-around">
            <h1>{this.state.budget.name}</h1>
          </div>
          <div className="right">
            <i className="fas fa-pencil-alt m-1" onClick={() => this.setState({ edit: true })} />
            <i className="fas fa-trash-alt m-1" onClick={() => this.deleteBudget()} />
          </div>
        </div>
        {/* Switch */}
        <div className="custom-control custom-switch mb-3">
          <input type="checkbox" className="custom-control-input" id="archived" checked={this.state.archived} onChange={() => this.archiveBudget()} />
          <label className="custom-control-label" htmlFor="archived">Archive</label>
        </div>
        <div className="d-flex justify-content-between">

          <h4 className="">${this.state.budget.spent}</h4>
          <h4>Amount Remaining: ${this.state.budget.remaining}</h4>
          <h4 className=" ">${this.state.budget.amount}</h4>

        </div>


        {this.progress()}

      </div>


      <div className="">
        <ListGroup className="">
          {this.state.categories.map(cat => {
            return <CategoryCard category={cat} key={cat.id} get={this.getBoth} api={this.props.api} />
          })}


        </ListGroup>
      </div>
      {/* Budget Modal */}
      <NewItemModal modal={this.state.edit} toggle={this.editToggle} form={<BudgetForm toggle={this.editToggle} budget={this.state.budget} get={this.getBoth} url={this.props.api.budgets} />} />
      {/* Category Modal */}
      <NewItemModal modal={this.state.modal} toggle={this.toggle} getBudgets={this.getBudgets} form={<CategoryForm toggle={this.toggle} get={this.getBoth} url={this.props.api.categories} budget={`${this.props.api.budgets}${this.props.match.params.budgetId}/`} budget_id={this.props.match.params.budgetId} />} />

    </div>


    if (this.state.loaded) {

      return (
        <div className='d-flex'>
          <div className=' '>
            <BudgetList budgets={this.props.api.budgets} budget_id={this.props.match.params.budgetId} budgetsArray={this.state.budgets} />
          </div >
          <div className=''>
            {budgetDetails}
          </div>
          <div className=' '>
            <BudgetBalancing api={this.props.api} budget={this.props.match.params.budgetId} budgetObj={this.state.budget} categories={this.state.categories} />
          </div >
        </div>

      )
    }
    else {
      this.getBoth()
      return <h1>Loading...</h1>
    }
  }
}

export default BudgetDetails

BudgetDetails.propTypes = {
  api: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,

}