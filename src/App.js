import React, { Component } from 'react';
import NavBar from './NavBar.js'
import AppManager from './AppManager.js'

class App extends Component {
    state = {
        budgets: [],
        categories: [],
        expenses: [],
        api: [],
        loaded: false
    }



    // dataRefresh = () => {
    //     let newState = {}
    //     return fetch('http://127.0.0.1:8000')
    //         .then( stuff => stuff.json())
    //         .then(api => {
    //             newState.api = api
    //             console.log(api)
    //             // this.setState({api})
    //             return fetch(api.budgets)
    //             .then(data => data.json())
    //             .then(budgets => {
    //                 newState.budgets = budgets
    //                 return fetch(api.categories)
    //                     .then(data => data.json())
    //                     .then(categories => {
    //                         newState.categories = categories
    //                         return fetch(api.expenses)
    //                             .then(data => data.json())
    //                             .then(expenses => {
    //                                 newState.expenses = expenses
    //                                 this.setState(newState)
    //                         })
    //             })
    //         })
    //     })
    // }

    componentDidMount() {
        // this.dataRefresh()
        return fetch('http://127.0.0.1:8000')
            .then( stuff => stuff.json())
            .then(api => {
                this.setState({api})
                this.setState({loaded: true})
            }
                )
    }

  render() {

    console.log(this.state.api)
    if(this.state.loaded){
    return (
      <div className="App">
        <NavBar/>
        <AppManager api={this.state.api}/>

      </div>
    );
  } else{
      return <h1>Loading</h1>
  }
}}

export default App;
