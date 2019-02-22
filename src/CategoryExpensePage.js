import React, { Component } from 'react';
import ExpenseInList from './ExpenseInList.js'

class CategoryExpensePage extends Component {

    state = {
        expenses: [],
        loaded: false
    }

    componentDidMount(){
        return fetch(`${this.props.api.expenses}?category_id=${this.props.match.params.categoryId}`)
        .then(data => data.json())
        .then(expenses => this.setState({expenses}))

    }

  render() {
      return(
        <>
            {this.state.expenses.map(expense =>{
                return <ExpenseInList expense={expense} key={expense.id}/>
            })}


        </>


        )

  }
}

export default CategoryExpensePage;
