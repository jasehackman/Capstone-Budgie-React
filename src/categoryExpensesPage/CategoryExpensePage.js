import React, { Component } from 'react'
import ExpenseInList from './ExpenseInList.js'
import APICalls from '../modules/APICalls.js'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'



class CategoryExpensePage extends Component {

  state = {
    expenses: [],
    loaded: false,
    category: {}
  }

  componentDidMount() {
    this.getExpenses()
    this.getCategory()
  }

  getExpenses = () => {
    APICalls.getWithQuery(this.props.api.expenses, 'category_id', this.props.match.params.categoryId)
      .then(expenses => this.setState({ expenses }))
  }

  getCategory = () => {
    APICalls.getOne(this.props.api.categories, this.props.match.params.categoryId)
      .then(category => {
        this.setState({ category })
      })
  }

  render() {
    return (
      <>
        <div className='card d-flex p-4 mb-4'>
          <div className=' d-flex '>
            <h1>Category: {this.state.category.name}</h1>
          </div>
          <div>
            <Link to={`/budget/${this.state.category.budget_id}`}>Back to budget</Link>
          </div>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <div className='row'>
              <div className='col'>
                <h6>Expense Name</h6>
              </div>
              <div className='col'>
                <h6>Cost</h6>
              </div>
              <div className='col'>
                <h6>Date</h6>
              </div>
              <div className='col'>
                <h6>Notes</h6>
              </div>
              <div className='col'>
                <h6>Delete/Edit</h6>
              </div>
            </div>
          </li>
          {this.state.expenses.map(expense => {
            return <ExpenseInList expense={expense} key={expense.id} getExpenses={this.getExpenses} apiExpenses={this.props.api.expenses} api={this.props.api} />
          })}
        </ul>
      </>
    )

  }
}

export default CategoryExpensePage

CategoryExpensePage.propTypes = {
  api: PropTypes.object,
  match: PropTypes.object,
}