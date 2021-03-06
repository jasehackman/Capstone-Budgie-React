import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Progress } from 'reactstrap'
import { ListGroupItem } from 'reactstrap'
import APICalls from '../modules/APICalls.js'
import PropTypes from 'prop-types'
import NewItemModal from '../NewItemModal.js'
import CategoryForm from '../forms/CategoryForm.js'




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

  stateSetter(){
    this.setState({
      category: this.props.category,
      editName: this.props.category.name,
      editAmount: this.props.category.amount

    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.stateSetter()
    }
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  getCategory = () => {
    APICalls.getOneWithUrl(this.props.category.url)
      .then(category => this.setState({ category }, ()=>this.props.get()))
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
        this.setState({
          category: category,
          edit: false
        })
      })

  }
  deleteCategory() {
    APICalls.deleteExactUrl(this.state.category.url)
      .then(() => this.props.get())
  }

  editToggle = () => {
    this.setState(({ edit }) => ({ edit: !edit })
    )
  }

  progress = () =>{
    //defines color of progress bar
    let progressBar
    if(this.state.category.percent <= 95){
      progressBar = <Progress value={this.state.category.percent} />
    }else if(this.state.category.percent <= 100){
      progressBar = <Progress color="warning" value={this.state.category.percent} />
    }else if(this.state.category.percent > 100){
      progressBar = <Progress color="danger" value={this.state.category.percent} />
    }
    return progressBar
  }

  render() {
    return (
      <ListGroupItem className="mt-3">
        <div className=' relative'>
          <div className="d-flex justify-content-around" >
            <Link className="link-style" to={`/category/${this.state.category.id}`}><h5 className="underline">{this.state.category.name}</h5></Link>
          </div>
          <div className="right">
            <i className="fas fa-pencil-alt m-1" onClick={() => this.editToggle()} />
            <i className="fas fa-trash-alt m-1" onClick={() => { this.deleteCategory() }} />
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <p className=''>${this.state.category.spent}</p>
          <p>Remaining: {this.state.category.remaining}</p>
          <p className=''>${this.state.category.amount}</p>
        </div>

        {this.progress()}
        <NewItemModal modal={this.state.edit} toggle={this.editToggle} form={
          <CategoryForm
            toggle={this.editToggle} category={this.state.category} get={this.getCategory}
            budget={this.props.category.budget} budget_id={this.props.category.budget_id}
            url={this.props.category.url}
          />
        } />
      </ListGroupItem >


    )

  }
}

export default CategoryCard
CategoryCard.propTypes = {
  get: PropTypes.func,
  category: PropTypes.object,
  api: PropTypes.object

}