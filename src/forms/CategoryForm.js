import React, { Component } from 'react'
import APICalls from '../modules/APICalls.js'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import PropTypes from 'prop-types'

class CategoryForm extends Component {

  state = {
    name: '',
    amount: '',
    budget: '',
    id: 0
  }

  componentDidMount() {
    if (this.props.category) {
      console.log(this.props.category)
      let category = {
        name: this.props.category.name,
        amount: this.props.category.amount,
        budget: this.props.category.budget,
        id: this.props.category.id
      }
      this.setState(category)
    }
  }


  post() {
    if (this.props.category) {
      console.log("yep")
    } else {
      const category = {
        amount: this.state.amount,
        name: this.state.name,
        budget: this.props.budget,
        budget_id: this.props.budget_id

      }
      APICalls.post(this.props.url, category)
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
          <Label>Category Name</Label>
          <Input type='text' id='name' defaultValue={this.state.name} onChange={(e) => this.handleFieldChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label>Category Amount</Label>
          <Input type='number' id='amount' defaultValue={this.state.amount} onChange={(e) => this.handleFieldChange(e)} />
        </FormGroup>
        <FormGroup>
          <Button onClick={() => this.post()}>Save</Button>
          <Button onClick={() => this.props.toggle()}>Back</Button>
        </FormGroup>
      </Form>
    )

  }
}

export default CategoryForm

CategoryForm.propTypes = {
  category: PropTypes.object,
  toggle: PropTypes.func,
  get: PropTypes.func,
  url: PropTypes.string,
  budget: PropTypes.string,
  budget_id: PropTypes.string

}