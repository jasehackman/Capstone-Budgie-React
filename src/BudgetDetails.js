import React, { Component } from 'react';
import CategoryCard from './CategoryCard.js';

class BudgetDetails extends Component {

    state = {
        budget: [],
        categories: [],
        loaded: false,

        // for new Category
        newCategoryName: '',
        newCategoryAmount: 0,
    }

    componentDidMount(){
        let newState= {}
        fetch(`${this.props.api.budgets}${this.props.match.params.budgetId}`)
        .then(data => data.json())
        .then(budget => {
            console.log("budget", budget)
            newState.budget = budget
            fetch(`${this.props.api.categories}?budget_id=${this.props.match.params.budgetId}`)
            .then(data => data.json())
            .then(categories => {
                console.log("categories", categories)
                newState.categories = categories
                console.log("newState", newState)
                this.setState(newState)
                this.setState({loaded: true})
            })
        }
            )
    }

    getCategories(){
        fetch(`${this.props.api.categories}?budget_id=${this.props.match.params.budgetId}`)
        .then(data => data.json())
        .then(categories => this.setState({categories}))
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
      }

    addCategory(){
        let postCategory = {
            amount: this.state.newCategoryAmount,
            name: this.state.newCategoryName,
            budget: `${this.props.api.budgets}${this.props.match.params.budgetId}/`,
            budget_id: this.props.match.params.budgetId
        }
        console.log(postCategory)
        fetch(this.props.api.categories,{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(postCategory)
        }).then(() => this.getCategories())

    }

    deleteCategory(){

    }


  render() {

    let newCategoryForm = (<div>
        <label>Category Name</label>
        <input type="text" id="newCategoryName" onChange={e =>this.handleFieldChange(e)}/>
        <label>Category Amount</label>
        <input type="number" id='newCategoryAmount' onChange={e =>this.handleFieldChange(e)}/>
        <button onClick={() => this.addCategory()}>Add Category</button>
    </div>)

    if(this.state.loaded){
        return (
        <div>
                <h1>{this.state.budget.name}</h1>
                <h4>Total Budget: {this.state.budget.amount}</h4>
                <h4>Amount Spent: {this.state.budget.spent}</h4>
                <h4>Amount Remaining: {this.state.budget.remaining}</h4>
                {newCategoryForm}
                <div>
                    {this.state.categories.map(cat =>{
                      return  <CategoryCard category={cat} key={cat.id}/>
                    })}


                </div>

        </div>
        );
    }
    else{
       return <h1>Loading...</h1>
    }
  }
}

export default BudgetDetails;
