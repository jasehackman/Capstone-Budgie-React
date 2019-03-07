import React, { Component } from 'react';
import ExpenseInList from './ExpenseInList.js'
import APICalls from './modules/APICalls.js';

class CategoryExpensePage extends Component {

  state = {
    expenses: [],
    loaded: false
  }

  componentDidMount() {
    this.getExpenses()
  }

  getExpenses = () => {
    APICalls.getWithQuery(this.props.api.expenses,"category_id", this.props.match.params.categoryId)
      .then(expenses => this.setState({ expenses }))
  }

  render() {
    return (
      <>
        {this.state.expenses.map(expense => {
          return <ExpenseInList expense={expense} key={expense.id} getExpenses={this.getExpenses} apiExpenses={this.props.api.expenses} />
        })}
      </>
    )

  }
}

export default CategoryExpensePage;
