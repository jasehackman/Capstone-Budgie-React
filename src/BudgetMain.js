import React, { Component } from 'react';
import BudgetCard from './BudgetCard.js'

class BudgetMain extends Component {

    state = {
        budgets: []
    }

    componentDidMount(){
        fetch(this.props.api.budgets)
        .then(data => data.json())
        .then(budgets => this.setState({budgets}))
    }

  render() {

    return (
      <div>
            <h1>Budgets</h1>
            <ul>
                {this.state.budgets.map(budget => {
                    return <BudgetCard budget={budget}/>
                })}
            </ul>

      </div>
    );
  }
}

export default BudgetMain;
