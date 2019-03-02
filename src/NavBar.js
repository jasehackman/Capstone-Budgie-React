import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NewExpenseModal from './NewExpenseModal'


class NavBar extends Component {


  state = {
    modal: false
  }

  toggle =() =>{
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    return (
      <div className="nav">
          <Link className="nav-link" to='/'>Budgets</Link>
          {/* <Link className="nav-link" to='/addExpense'>Add Expense</Link> */}
          <button className="btn-primary" onClick={this.toggle}>Add Expense</button>

          <NewExpenseModal modal={this.state.modal} toggle={this.toggle} api={this.props.api} apiRefresh={this.props.apiRefresh}/>


      </div>
    );
  }
}

export default NavBar;
