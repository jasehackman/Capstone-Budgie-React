import React, { Component } from 'react';
import { Link } from "react-router-dom";


class NavBar extends Component {



  render() {
    return (
      <div >
          <Link to='/'>Budgets</Link>
          <Link to='/addExpense'>Add Expense</Link>


      </div>
    );
  }
}

export default NavBar;
