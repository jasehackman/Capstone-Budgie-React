import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BudgetBalancing extends Component {

  categoryStatus = (props) => {
    // Alerts user if a category is over budget
    let overageList = []
    overageList = props.map(category => {
      if (category.remaining < 0.00) {
        return <div key={category.id} className="card p-2 warn pl-3 pr-3 alert" >
          <h6 className='card-title bottom'>!Alert!</h6>
          <p className='card-text'>You have over spent in <strong>{category.name} </strong></p>
        </div>
      }
    })
    return overageList
  }

  allocation = () => {
    // Alerts user if they don't have the correct amount allocated to categories
    let budgetBal = ''
    if (this.props.budgetObj.to_allocate < 0.00) {
      let dif = this.props.budgetObj.amount - this.props.budgetObj.allocated
      budgetBal = <div className="card p-2 warn pl-3 pr-3 alert" >
        <h6 className='card-title bottom'>!Alert!</h6>
        <p className='card-text'>You have put <strong>${-dif} </strong>too much in your categories</p>
      </div>
    } else if (this.props.budgetObj.to_allocate > 0.00) {
      budgetBal = <div className="card p-2 warn pl-3 pr-3 alert" >
        <h6 className='card-title bottom'>!Alert!</h6>
        <p className="card-text">You have <strong>${this.props.budgetObj.to_allocate}</strong> left to budget</p>
      </div>
    }
    return budgetBal
  }

  overBudget = () => {
    let alert = ''
    if (this.props.budgetObj.remaining <= 0.00) {
      alert = <div className="card p-2 warn pl-3 pr-3 alert" >
        <h6 className='card-title bottom'>!Alert!</h6>
        <p className='card-text'>You are over budget by <strong>${-this.props.budgetObj.remaining}! </strong></p>
      </div>
    }
    return alert
  }


  render() {
    return (
      <div className="">
        {this.overBudget()}
        {this.allocation()}
        {this.categoryStatus(this.props.categories)}
      </div>
    )

  }
}

export default BudgetBalancing
BudgetBalancing.propTypes = {
  api: PropTypes.object,
  budget: PropTypes.string,
  budgetObj: PropTypes.object,
  categories: PropTypes.array

}