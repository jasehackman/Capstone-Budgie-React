import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NewExpenseModal from './NewExpenseModal'


class NavBar extends Component {


  state = {
    modal: false
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('id')
  }

  render() {
    return (
      <div className="nav d-flex justify-content-between">
        <Link to='/'>
          <img className="img m-2" src='img/budgiefinalvector.png' />
        </Link>
        <div className="d-flex m-2">
          <button className="btn btn-primary expense mr-2" onClick={this.toggle}>Add Expense</button>
          <NewExpenseModal modal={this.state.modal} toggle={this.toggle} api={this.props.api} apiRefresh={this.props.apiRefresh} />
          <Link to='/' onClick={() => this.logout()}>Logout</Link>
        </div>
      </div>
    )
  }
}

export default NavBar
