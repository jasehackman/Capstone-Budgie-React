import React, { Component } from 'react';
import { Link } from "react-router-dom"


class CategoryCard extends Component {



  render() {
    return(
        <Link to={`/category/${this.props.category.id}`}>
            <h4>{this.props.category.name}</h4>
            <p>Amount: {this.props.category.amount}</p>
            <p>Spent: {this.props.category.spent}</p>
            <p>Remaining: {this.props.category.remaining}</p>


        </Link>
    )
  }
}

export default CategoryCard;
