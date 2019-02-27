import React, { Component } from 'react';
import { Link } from "react-router-dom"


class CategoryCard extends Component {
    state = {
        edit: false,
        category: {},

        editName: '',
        editAmount: '',

    }

    componentDidMount(){
     this.setState({
         category:this.props.category,
         editName:this.props.category.name,
         editAmount: this.props.category.amount

    })
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    getCategory(){
        fetch(`${this.props.api.category}${this.props.category.id}`)
        .then(data => data.json())
        .then(category => this.setState({category}))
    }

    editCategory() {
        let putCategory = {
            amount: this.state.editAmount,
            name: this.state.editName,
            budget: this.state.category.budget,
            budget_id: this.state.category.budget_id,
            url: this.state.category.url
        }
        console.log(putCategory)
        fetch(`${this.state.category.url}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(putCategory)
        }).then((data) => data.json())
            .then(category => {
                console.log(category)
                this.setState({
                category: category,
                edit: false
            })})

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
                    <Link to={`/category/${this.state.category.id}`}>{this.state.category.name}</Link>
                    <p>Amount: {this.state.category.amount}</p>
                    <p>Spent: {this.state.category.spent}</p>
                    <p>Remaining: {this.state.category.remaining}</p>
                    <button onClick={() => { this.deleteCategory() }}>Delete</button>
                    <button onClick={() => { this.setState({ edit: true }) }}>Edit</button>
                </div>

            )
        }
        else if (this.state.edit === true) {
            return (<div>
                <label>Expense Name</label>
                <input type="text" id='editName' defaultValue={this.state.category.name} onChange={(e) => this.handleFieldChange(e)} />
                <label>Amount</label>
                <input type='number' id='editAmount' defaultValue={this.state.category.amount} onChange={(e) => this.handleFieldChange(e)} />
                <button onClick={() => this.editCategory()}>Save Category</button>
                <button onClick={() => this.setState({ edit: false })}>Back</button>
            </div>
            )
        }
    }
}

export default CategoryCard;
