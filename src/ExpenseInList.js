import React, { Component } from 'react';

class ExpenseInList extends Component {



  render() {
      return(
        <div>
           <h4>{this.props.expense.name}</h4>
           <p>{this.props.expense.amount}</p>
           <p>{this.props.expense.date}</p>
           <p>{this.props.expense.notes}</p>


        </div>


        )

  }
}

export default ExpenseInList;
