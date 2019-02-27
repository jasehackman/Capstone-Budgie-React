import React, { Component } from 'react';

// TODO:Turn this into a modal
// TODO: Clear forms when you hit submit

class AddExpense extends Component {

    state = {
        budgets: [],
        categories: [],
        categoryChoice: '',
        newExpenseName: '',
        newExpenseAmount: '',
        newExpenseDate: '',
        newExpenseNotes: ''



    }


    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        fetch(this.props.api.budgets)
            .then(data => data.json())
            .then(budgets => this.setState({ budgets }))
    }

    getBudgetCategories(id) {
        if (id === "0") {
            console.log("i'm here")
            return}

        let url = `${this.props.api.categories}?budget_id=${id}`
        console.log(url)

        fetch(`${this.props.api.categories}?budget_id=${id}`)
            .then(data => data.json())
            .then(categories => this.setState({ categories }))
    }

    addCategoryForm() {
        let form
        if (this.state.categories.length > 0) {

            form = <>
                <label>Pick Which Category</label>
                <select id="categoryChoice" onChange={(e) => this.handleFieldChange(e)}>
                    <option value="0">Default</option>
                    {this.state.categories.map(category => {
                        return <option key={category.id} value={category.id}>{category.name}</option>
                    })}


                </select>
            </>

        }
        return form
    }

    addExpense(){
       let expenseToAdd={
            name: this.state.newExpenseName,
            amount: this.state.newExpenseAmount,
            date: this.state.newExpenseDate,
            notes: this.state.newExpenseNotes,
            category_id: this.state.categoryChoice,
            category: `${this.props.api.categories}${this.state.categoryChoice}`
        }
        console.log(expenseToAdd)
        fetch(this.props.api.expenses,{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(expenseToAdd)
        })

    }

    // TODO: if an expense doesn't have a category nothign is going to happen
    // TODO: if they go back and select defult it will break
    // TODO: Add Form Validation
    addExpenseForms(){
        let form;
        if (this.state.categoryChoice != ''){
            form =<>
                <label>Expense Name</label>
                <input type="text" id='newExpenseName' onChange={(e)=>this.handleFieldChange(e)} />
                <label>Amount</label>
                <input type='number' id='newExpenseAmount' onChange={(e)=>this.handleFieldChange(e)} />
                <label>Date</label>
                <input type='date' id='newExpenseDate' onChange={(e)=>this.handleFieldChange(e)} />
                <label>Notes</label>
                <input type='textfield' id='newExpenseNotes' onChange={(e)=>this.handleFieldChange(e)}/>
                <button onClick={()=>this.addExpense()}>Add Expense</button>

            </>
        }
        return form
    }

    render() {


        return (
            <div >
                <label>Pick Which Budget:</label>
                <select onChange={(e) => this.getBudgetCategories(e.target.value)}>
                    <option value="0">Default</option>
                    {this.state.budgets.map(budget => {
                        return <option key={budget.id} value={budget.id}>{budget.name}</option>

                    })}


                </select>
                {this.addCategoryForm()}
                {this.addExpenseForms()}


            </div>
        );
    }
}

export default AddExpense;
