import React, { Component } from 'react';

class BudgetMain extends Component {



  render() {
    return (
      <div>
          {/* make url an id */}
            <li key={this.props.budget.url}>{this.props.budget.name} Amount: {this.props.budget.amount}
                Spent: {this.props.budget.spent} What's Left {this.props.budget.remaining}
            </li>
      </div>
    );
  }
}

export default BudgetMain;
