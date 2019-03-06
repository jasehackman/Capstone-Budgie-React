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

  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  render() {
    return (
      <div className="nav">
          <Link className="nav-link" to='/'>Budgets</Link>
          <button className="btn-primary" onClick={this.toggle}>Add Expense</button>

          <NewExpenseModal modal={this.state.modal} toggle={this.toggle} api={this.props.api} apiRefresh={this.props.apiRefresh}/>

          <Link to='/' onClick={()=>this.logout()}>Logout</Link>


      </div>
    );
  }
}

export default NavBar;
