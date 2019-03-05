import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Progress } from 'reactstrap';

class BudgetMain extends Component {



  render() {
    return (
      <div className="col-4 mb-4 mt-4">
        <a href={`/budget/${this.props.budget.id}`} className="link-style">
          {/* make url an id */}
          <div className="body card p-3 shadow">
            <h4 className="card-title">{this.props.budget.name}</h4>
            <p>Budget Amount: {this.props.budget.amount}</p>
            <p>Amount Spent: {this.props.budget.spent}</p>
            <p>Amount Remaining: {this.props.budget.remaining}</p>
            <Progress value={this.props.budget.percent}/>
          </div>
        </a>
      </div>
    );
  }
}

export default BudgetMain;
