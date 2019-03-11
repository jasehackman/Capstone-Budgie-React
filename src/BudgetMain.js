import React, { Component } from 'react';
import BudgetCard from './BudgetCard.js'
import APICalls from './modules/APICalls.js'
import NewItemModal from './NewItemModal.js'



class BudgetMain extends Component {

  state = {
    budgets: [],
    newBudgetName: '',
    newBudgetAmount: 0,
    archived: false,
    modal: false
  }

  componentDidMount() {
    this.getBudgets ()
  }

  getBudgets = () => {
    if(this.state.archived === true)
    APICalls.getWithQuery(this.props.api.budgets,"archived",true)
      .then(budgets => this.setState({ budgets }))
    else if(this.state.archived === false){
      APICalls.getWithQuery(this.props.api.budgets,"archived",false)
      .then(budgets => this.setState({ budgets }))
    }
  }

  addBudget = () => {
    let postBudget = {
      name: this.state.newBudgetName,
      amount: this.state.newBudgetAmount,
      user: `http://127.0.0.1:8000/users/${localStorage.getItem('id')}/`
    }

    APICalls.post(this.props.api.budgets, postBudget)
      .then(() => {
        this.getBudgets()
        this.toggle()
      })
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  archiveClick(){
    this.setState(({archived}) =>({archived: !archived}), ()=> this.getBudgets)
  }

  toggle = () => {
    this.setState(({modal}) => ({modal: !modal})
    )
  }

  render() {
    let budgetForm = (<div>
      <label>Budget Name</label>
      <input type="text" id="newBudgetName" onChange={e => this.handleFieldChange(e)} />
      <label>Budget Amount</label>
      <input type="number" id='newBudgetAmount' onChange={e => this.handleFieldChange(e)} />
      <button className="btn-primary" onClick={() => this.addBudget()}>Add Budget</button>
    </div>)
    if (this.state.budgets.length > 0) {



      return (

        <div className="">
          <div className="row">
            <div className="mx-auto col">
              <h1 className="mx-auto">Budgets</h1>
            </div>
            <div className="custom-control custom-switch">
              <input type="checkbox" className="custom-control-input" id="archived"  onChange={() => this.archiveClick()} />
              <label className="custom-control-label" htmlFor="archived">Show Archived</label>
            </div>

          </div>
          <button className="btn-primary" onClick={this.toggle}>Add Budget</button>
          <NewItemModal modal={this.state.modal} toggle={this.toggle} get={this.getBudgets} form={budgetForm} />
          <div className="container">
            <div className="row">
              {this.state.budgets.map(budget => {
                return <BudgetCard budget={budget} key={budget.id} />
              })}
            </div>
          </div>

        </div>
      );
    } else {
      return (<p>loading</p>)
    }
  }
}

export default BudgetMain;
