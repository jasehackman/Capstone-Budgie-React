import React, { Component } from 'react';
import { Link } from "react-router-dom"


class CategoryCard extends Component {
    state = {
        edit: false,
        category: {}
    }

    componentDidMount(){
     this.setState({category:this.props.category})
    }

    getCategory(){
        fetch(`${this.props.api.category}${this.props.category.id}`)
        .then(data => data.json())
        .then(category => this.setState({category}))
    }

    editCategory() {

    }
    deleteCategory() {

        console.log("delete", this.props.category.url)
        fetch(`${this.state.category.url}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then(()=>this.props.getCategories())

    }

    render() {
        if (this.state.edit === false) {
            return (
                <div >
                    <Link to={`/category/${this.props.category.id}`}>{this.props.category.name}</Link>
                    <p>Amount: {this.props.category.amount}</p>
                    <p>Spent: {this.props.category.spent}</p>
                    <p>Remaining: {this.props.category.remaining}</p>
                    <button onClick={() => { this.deleteCategory() }}>Delete</button>
                    <button onClick={() => { this.setState({ edit: true }) }}>Edit</button>
                </div>

            )
        }
        else if (this.state.edit === true) {
            return (<div>
                <label>Expense Name</label>
                <input type="text" id='editName' defaultValue={this.state.editExpense.name} onChange={(e) => this.handleFieldChange(e)} />
                <label>Amount</label>
                <input type='number' id='editAmount' defaultValue={this.state.editExpense.amount} onChange={(e) => this.handleFieldChange(e)} />
                <label>Date</label>
                <input type='date' id='editDate' defaultValue={this.state.editExpense.date} onChange={(e) => this.handleFieldChange(e)} />
                <label>Notes</label>
                <input type='textfield' id='editNotes' defaultValue={this.state.editExpense.notes} onChange={(e) => this.handleFieldChange(e)} />
                <button onClick={() => this.editCategorye()}>Save Expense</button>
                <button onClick={() => this.setState({ edit: false })}>Back</button>
            </div>
            )
        }
    }
}

export default CategoryCard;
