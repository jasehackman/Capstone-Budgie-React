import React, { Component } from 'react';
import BudgetCard from './BudgetCard.js'


class BudgetMain extends Component {

  state = {
    budgets: [],
    newBudgetName: '',
    newBudgetAmount: 0
  }

  componentDidMount() {
    this.getBudgets()
  }

  getBudgets() {
    fetch(this.props.api.budgets)
      .then(data => data.json())
      .then(budgets => this.setState({ budgets }))
  }

  addBudget() {
    let postBudget = {
      name: this.state.newBudgetName,
      amount: this.state.newBudgetAmount,
      user: "http://127.0.0.1:8000/users/1/"
    }
    fetch(this.props.api.budgets, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postBudget)
    }).then(() => this.getBudgets())
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  render() {
    let newBudgetForm = (<div>
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
          </div>
          {newBudgetForm}
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
