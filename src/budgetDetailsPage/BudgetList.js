import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import APICalls from '../modules/APICalls.js'
import PropTypes from 'prop-types'

class BudggetList extends Component {
  state = {
    budgets: [],
    loaded: false
  }

  getBudgets() {
    APICalls.getWithQuery(this.props.budgets,'archived', false)
      .then(budgets => this.setState({ budgets }, this.setState({ loaded: true })))
  }

  componentDidMount(){
    this.getBudgets()
  }


  render() {
    if (this.state.loaded === true) {


      return (
        <div className='card p-2 alert'>
          <h4>My Budgets</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group list-group-item list-group-item-action"><Link className='link-style' to={'/'}><strong>All Budgets</strong></Link></li>
            {this.props.budgetsArray.map(budget => {
              if(budget.id !== Number(this.props.budget_id)){
                return <li key={budget.id} className="list-group list-group-item list-group-item-action"><Link className='link-style' to={`/budget/${budget.id}`}>{budget.name}</Link></li>
              }
            })}
          </ul>

        </div>

      )
    } else{
      return <p>loading...</p>
    }

  }
}

export default BudggetList
BudggetList.propTypes = {
  budgets: PropTypes.string,
  budget_id: PropTypes.string,
  budgetArray: PropTypes.array

}