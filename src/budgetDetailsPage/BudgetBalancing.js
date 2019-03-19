import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Progress } from 'reactstrap'
import { ListGroupItem } from 'reactstrap'
import APICalls from '../modules/APICalls.js'
import PropTypes from 'prop-types'

class BudgetBalancing extends Component {
  state = {
    budget: {},
    loaded: false,
    categories: []
  }



  componentDidMount() {
    this.stateSetter()
  }

  stateSetter() {
    this.setState({
      budget: this.props.budgetObj,
      categories: this.props.categories,
      loaded: true
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.forceUpdate()
    }
  }


  categoryStatus = (props) => {
    let overageList = []
    overageList = props.map(category => {
      if (category.remaining < 0.00) {
        return <div className="card p-2 warn pl-3 pr-3 alert" >
          <h6 className='card-title bottom'>!Alert!</h6>
          <p className='card-text'>You have over spent in <strong>{category.name} </strong></p>
        </div>
      }
    })
    return overageList
  }

  allocation = () => {
    let budgetBal = ''
    if (this.props.budgetObj.to_allocate < 0.00) {
      let dif = this.props.budgetObj.amount - this.props.budgetObj.allocated
      budgetBal = <div className="card p-2 warn pl-3 pr-3 alert" >
        <h6 className='card-title bottom'>!Alert!</h6>
        <p className='card-text'>You have put <strong>${-dif} </strong>too much in your categories</p>
      </div>
    } else if (this.props.budgetObj.to_allocate > 0.00) {
      budgetBal = <div className="card p-2 warn pl-3 pr-3 alert" >
        <h6 className='card-title'>!Alert!</h6>
        <p className="card-text">You have <strong>${this.props.budgetObj.to_allocate}</strong> left to budget</p>
      </div>
    }
    return budgetBal
  }


  render() {
    return (
      <div className="">
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