import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Progress } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import APICalls from './modules/APICalls.js';



class CategoryCard extends Component {
  state = {
    edit: false,
    category: {},

    editName: '',
    editAmount: '',

  }

  componentDidMount() {
    this.setState({
      category: this.props.category,
      editName: this.props.category.name,
      editAmount: this.props.category.amount

    })
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  getCategory() {
    APICalls.getOne(this.props.api.category, this.props.category.id)
      .then(category => this.setState({ category }))
  }

  editCategory() {
    let putCategory = {
      amount: this.state.editAmount,
      name: this.state.editName,
      budget: this.state.category.budget,
      budget_id: this.state.category.budget_id,
      url: this.state.category.url
    }

    APICalls.updateExactUrl(this.state.category.url, putCategory)
      .then(category => {
        console.log(category)
        this.setState({
          category: category,
          edit: false
        })
      })

  }
  deleteCategory() {
    APICalls.deleteExactUrl(this.state.category.url)
    .then(() => this.props.getCategories())
  }

  render() {
    if (this.state.edit === false) {
      return (
        <ListGroupItem >
          <div className="d-flex justify-content-around">
            <Link to={`/category/${this.state.category.id}`}>{this.state.category.name}</Link>
          </div>
          <div className="d-flex justify-content-around">
            <p>Amount: {this.state.category.amount}</p>
            <p>Spent: {this.state.category.spent}</p>
            <p>Remaining: {this.state.category.remaining}</p>
          </div>

          <Progress value={this.state.category.percent} />
          <button onClick={() => { this.deleteCategory() }}>Delete</button>
          <button onClick={() => { this.setState({ edit: true }) }}>Edit</button>
        </ListGroupItem >

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
