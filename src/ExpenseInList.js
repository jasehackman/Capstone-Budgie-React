import React, { Component } from 'react';

class ExpenseInList extends Component {
    state = {
        editName: "",
        editAmount: "",
        editDate: '',
        editnotes: '',

        edit: false,

        expense: {},
        editExpense: {}
    }

    componentDidMount(){
        this.setState({
            editExpense: this.props.expense,
            editName: this.props.expense.name,
            editAmount: this.props.expense.amount,
            editDate: this.props.expense.date,
            editnotes: this.props.expense.notes
        })
    }
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
       let editObject = {
            name: this.state.editName,
            amount: this.state.editAmount,
            date: this.state.editDate,
            notes: this.state.editnotes,
            category_id: this.state.editExpense.category_id,
            category: this.state.editExpense.category
        }
        fetch(`${this.props.apiExpenses}${this.props.expense.id}/`,{
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(editObject)
          }
        ).then((data) => data.json())
        .then(expense => this.setState({
            editExpense: expense,
            edit: false
        }))
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

  render() {

    if(this.state.edit===false){
      return(
        <div>
           <h4>{this.state.editExpense.name}</h4>
           <p>{this.state.editExpense.amount}</p>
           <p>{this.state.editExpense.date}</p>
           <p>{this.state.editExpense.notes}</p>
           <button onClick={()=> {this.deleteExpense()}}>Delete</button>
           <button onClick={()=>{this.setState({edit:true})}}>Edit</button>


        </div>


        )}
    if(this.state.edit === true){
        return(
            <div>
                <label>Expense Name</label>
                <input type="text" id='editName' defaultValue={this.state.editExpense.name} onChange={(e)=>this.handleFieldChange(e)} />
                <label>Amount</label>
                <input type='number' id='editAmount' defaultValue={this.state.editExpense.amount} onChange={(e)=>this.handleFieldChange(e)} />
                <label>Date</label>
                <input type='date' id='editDate' defaultValue={this.state.editExpense.date} onChange={(e)=>this.handleFieldChange(e)} />
                <label>Notes</label>
                <input type='textfield' id='editNotes' defaultValue={this.state.editExpense.notes} onChange={(e)=>this.handleFieldChange(e)}/>
                <button onClick={()=>this.editExpense()}>Save Expense</button>
                <button onClick={()=>this.setState({edit:false})}>Back</button>
            </div>


        )
    }

  }
}

export default ExpenseInList;
