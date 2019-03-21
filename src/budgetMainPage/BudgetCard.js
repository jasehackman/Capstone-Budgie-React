import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Progress } from 'reactstrap'
import PropTypes from 'prop-types'


class BudgetMain extends Component {

  render() {
    return (
      <div className="col-4 mb-4 mt-4">
        <Link to={`/budget/${this.props.budget.id}`} className="link-style">
          <div className="body card p-3 shadow">
            <div className="d-flex justify-content-center">
              <h4 className="card-title">{this.props.budget.name}</h4>
            </div>
            <div className="d-flex justify-content-between">
              <p>${this.props.budget.spent}</p>
              <p>Remaining: ${this.props.budget.remaining}</p>
              <p>${this.props.budget.amount}</p>
            </div>
            <Progress value={this.props.budget.percent} />
          </div>
        </Link>
      </div>
    )
  }
}

export default BudgetMain


BudgetMain.propTypes = {
  budget: PropTypes.object,
}