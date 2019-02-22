import React, { Component } from 'react';
import { Link } from "react-router-dom"

class BudgetMain extends Component {



  render() {
    return (
      <Link to={`/budget/${this.props.budget.id}`}>
          {/* make url an id */}
            <h4>{this.props.budget.name}</h4>
            <p>Budget Amount: {this.props.budget.amount}</p>
            <p>Amount Spent: {this.props.budget.spent}</p>
            <p>Amount Remaining: {this.props.budget.remaining}</p>
      </Link>
    );
  }
}

export default BudgetMain;
