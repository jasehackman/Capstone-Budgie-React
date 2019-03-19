import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Progress } from 'reactstrap'
import { ListGroupItem } from 'reactstrap'
import APICalls from '../modules/APICalls.js'
import PropTypes from 'prop-types'

class BudgetPie extends Component {
  state = {
    budgets: [],
    loaded: false
  }



  componentDidMount(){
  }


  render() {
    return <p>hi</p>

  }
}

export default BudgetPie
BudgetPie.propTypes = {
  budgets: PropTypes.string

}