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

  stateSetter(){
    this.setState({
      budget: this.props.budgetObj,
      categories: this.props.categories,
      loaded: true
    })
  }

  componentDidUpdate(prevProps){
    if (prevProps !== this.props) {
      this.forceUpdate()
    }
  }


  categoryStatus = (props) => {
    let overageList = []
    props.forEach(category => {
      if (category.remaining < 0.00) {
        overageList.push(category.name)
      }
    })

    let overage = ''
    if (overageList.length > 0) {
      overage = <div className="card p-2 mb-2 warn">
        <h6>You over spent in:</h6>
        <ul>
          {overageList.map(name => {
            return <li key={name}>{name}</li>

          })}
        </ul>
      </div>
    }

    return overage
  }

  allocation = () => {
    let budgetBal = ''
    if (this.props.budgetObj.to_allocate < 0.00) {
      let dif = this.props.budgetObj.amount - this.props.budgetObj.allocated
      budgetBal = <div className="card p-2" >
        <h6>You have put ${-dif} too much in your categories</h6>
      </div>
    }else if(this.props.budgetObj.to_allocate > 0.00){
      budgetBal = <div className="card p-2" >
        <h6>You have ${this.props.budgetObj.to_allocate} left to budget</h6>
      </div>
    }
    return budgetBal
  }


  render() {
    return (
      <div className="">
        {this.categoryStatus(this.props.categories)}
        {this.allocation()}
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