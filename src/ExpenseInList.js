import React, { Component } from 'react';

class ExpenseInList extends Component {

    deleteExpense(){
        console.log("delete", this.props.expense.id)
        fetch(`${this.props.apiExpenses}${this.props.expense.id}`,{
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          }
        ).then(() => this.props.getExpenses())
    }

    editExpense(){
        console.log("edit", this.props.expense.id)
    }

  render() {
      return(
        <div>
           <h4>{this.props.expense.name}</h4>
           <p>{this.props.expense.amount}</p>
           <p>{this.props.expense.date}</p>
           <p>{this.props.expense.notes}</p>
           <button onClick={()=> {this.deleteExpense()}}>Delete</button>
           <button onClick={()=>{this.editExpense()}}>Edit</button>


        </div>


        )

  }
}

export default ExpenseInList;
