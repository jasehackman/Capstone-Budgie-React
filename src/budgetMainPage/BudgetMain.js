import React, { Component } from 'react'
import BudgetCard from './BudgetCard.js'
import APICalls from '../modules/APICalls.js'
import NewItemModal from '../NewItemModal.js'
import PropTypes from 'prop-types'
import BudgetForm from '../forms/BudgetForm.js'


class BudgetMain extends Component {

  state = {
    budgets: [],
    newBudgetName: '',
    newBudgetAmount: 0,
    archived: false,
    modal: false
  }

  componentDidMount() {
    this.getBudgets()
  }

  getBudgets = () => {
    if (this.state.archived === true)
      APICalls.getWithQuery(this.props.api.budgets, 'archived', true)
        .then(budgets => this.setState({ budgets }))
    else if (this.state.archived === false) {
      APICalls.getWithQuery(this.props.api.budgets, 'archived', false)
        .then(budgets => this.setState({ budgets }))
    }
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  archiveClick() {
    this.setState(({ archived }) => ({ archived: !archived }), () => this.getBudgets())
  }

  toggle = () => {
    this.setState(({ modal }) => ({ modal: !modal })
    )
  }

  render() {

    if (this.state.budgets.length > 0) {
      return (

        <div className="">
          <div className="row card m-3 pt-4 pb-4" >
            <div className="col d-flex justify-content-between">
              <div>
                <button className=" btn btn-primary" onClick={this.toggle}>+ Budget</button>
              </div>
              <div className="mx-auto ">
                <h1 className="">Budgets</h1>
              </div>
              <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="archived" onChange={() => this.archiveClick()} />
                <label className="custom-control-label" htmlFor="archived">Show Archived</label>
              </div>
            </div>

          </div>
          <NewItemModal modal={this.state.modal} toggle={this.toggle} get={this.getBudgets} form={<BudgetForm get={this.getBudgets} url={this.props.api.budgets} toggle={this.toggle} user={this.props.api.users} />} />
          <div className="container">
            <div className="row">
              {this.state.budgets.map(budget => {
                return <BudgetCard budget={budget} key={budget.id} />
              })}
            </div>
          </div>

        </div>
      )
    } else {
      return (<p>loading</p>)
    }
  }
}

export default BudgetMain

BudgetMain.propTypes = {
  api: PropTypes.object,


}