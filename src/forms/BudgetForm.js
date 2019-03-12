import React, { Component } from 'react'
import APICalls from '../modules/APICalls.js'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import PropTypes from 'prop-types'

class BudgetForm extends Component {

  state = {
    budgetName: '',
    budgetAmount: '',
    user: '',
    id: 0
  }

  componentDidMount() {
    if (this.props.budget) {
      let { budget } = this.props
      const stateBudget = {
        budgetName: budget.name,
        budgetAmount: budget.amount,
        user: budget.user,
        id: budget.id
      }
      this.setState(stateBudget)
    }
  }


  post() {
    if (this.props.budget) {
      const budget = {
        amount: this.state.budgetAmount,
        name: this.state.budgetName,
        user: this.state.user,
        id: this.state.id
      }
      APICalls.update(this.props.url, budget.id, budget)
        .then(budget => {
          this.props.get()
          this.props.toggle()
        })
    } else {
      const budget = {
        amount: this.state.budgetAmount,
        name: this.state.budgetName,
        user: `${this.state.user}${localStorage.getItem('id')}/`
      }
      APICalls.post(this.props.url, budget)
        .then(() => {
          this.props.get()
          this.props.toggle()
        })

    }
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }



  render() {
    return (
      <Form>
        <FormGroup>
          <Label>Budget Name</Label>
          <Input type="text" id="budgetName" defaultValue={this.state.budgetName} onChange={(e) => this.handleFieldChange(e)}/>
        </FormGroup>

        <FormGroup>
          <Label>Budget Amount</Label>
          <Input type="text" id="budgetAmount" defaultValue={this.state.budgetAmount} onChange={(e) => this.handleFieldChange(e)}/>
        </FormGroup>

        <FormGroup>
          <Button onClick={() => this.post()}>Save</Button>
          <Button onClick={() => this.props.toggle()}>Back</Button>
        </FormGroup>
      </Form>
    )

  }
}

export default BudgetForm

BudgetForm.propTypes = {
  budget: PropTypes.object,
  toggle: PropTypes.func,
  get: PropTypes.func,
  url: PropTypes.string,
  user: PropTypes.string,

}