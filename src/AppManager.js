import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom"
import BudgetMain from './BudgetMain.js'
import BudgetDetails from './BudgetDetails.js'
import CategoryExpensePage from './CategoryExpensePage.js'


class AppManager extends Component {


  render() {
    return (
      <React.Fragment >
          <Route exact path = "/" render = {(props => {
              console.log("props", this.props.api)
            return <BudgetMain {...props} api={this.props.api}/>

            })}/>

            <Route path = "/budget/:budgetId(\d)" render = {(props => {
              console.log("props", this.props.api)
            return <BudgetDetails {...props} api={this.props.api} />

            })}/>

            <Route path = "/category/:categoryId(\d)" render = {(props => {
              console.log("props", this.props.api)
            return <CategoryExpensePage {...props} api={this.props.api} />

            })}/>


      </React.Fragment>
    );
  }
}

export default AppManager;
