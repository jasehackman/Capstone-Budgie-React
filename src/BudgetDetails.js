import React, { Component } from 'react';

class BudgetDetails extends Component {

    state = {
        budget: []
    }

    componentDidMount(){
        fetch(`${this.props.api.budgets}${this.props.match.params.budgetId}`)
        .then(data => data.json())
        .then(budget => this.setState({budget}))
    }

  render() {

    return (
      <div>
            <h1>{this.state.budget.name}</h1>

      </div>
    );
  }
}

export default BudgetDetails;
