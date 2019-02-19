import React, { Component } from 'react';
import BudgetMain from './BudgetMain.js'
import { Route, Redirect } from "react-router-dom"


class AppManager extends Component {


  render() {
    return (
      <React.Fragment >
          <Route exact path = "/" render = {(props => {
              console.log("props", this.props.api)
            return <BudgetMain {...props} api={this.props.api}/>

      })}/>

      </React.Fragment>
    );
  }
}

export default AppManager;
