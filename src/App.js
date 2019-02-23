import React, { Component } from 'react';
import NavBar from './NavBar.js'
import AppRouter from './AppRouter.js'

class App extends Component {
    state = {
        budgets: [],
        categories: [],
        expenses: [],
        api: [],
        loaded: false,
        apiurl:'http://127.0.0.1:8000/'

    }


    componentDidMount() {
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
        <AppRouter api={this.state.api} />

      </div>
    );
  } else{
      return <h1>Loading</h1>
  }
}}

export default App;
