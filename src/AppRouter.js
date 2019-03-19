import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BudgetMain from './budgetMainPage/BudgetMain.js'
import BudgetDetails from './budgetDetailsPage/BudgetDetails.js'
import CategoryExpensePage from './categoryExpensesPage/CategoryExpensePage.js'
import AddExpense from './AddExpense.js'
import PropTypes from 'prop-types'



class AppManager extends Component {


  render() {
    return (
      <React.Fragment >
        <Route exact path="/" render={(props => {
          return <BudgetMain {...props} api={this.props.api} />

        })} />

        <Route path="/budget/:budgetId(\d+)" render={(props => {
          return <BudgetDetails {...props} api={this.props.api} />

        })} />

        <Route path="/category/:categoryId(\d+)" render={(props => {
          return <CategoryExpensePage {...props} api={this.props.api} />

        })} />

        <Route path="/addExpense" render={(props => {
          return <AddExpense {...props} api={this.props.api} />

        })} />


      </React.Fragment>
    )
  }
}

export default AppManager


AppManager.propTypes = {
  api: PropTypes.object
}