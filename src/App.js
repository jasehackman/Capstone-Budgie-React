import React, { Component } from 'react';
import NavBar from './NavBar.js'
import AppRouter from './AppRouter.js'
import Login from './Login.js'

class App extends Component {
  state = {
    budgets: [],
    categories: [],
    expenses: [],
    api: [],
    loaded: false,
    apiurl: 'http://127.0.0.1:8000/'

  }


  componentDidMount() {
    this.apiRefresh()
  }

  apiRefresh = () => {
    return fetch('http://127.0.0.1:8000')
      .then(stuff => stuff.json())
      .then(api => {
        this.setState({ api })
        this.setState({ loaded: true })
      }
      )
  }

  authenticated() {
    if (localStorage.getItem("token")){
      console.log("top")
      return <div className="App">

        <NavBar api={this.state.api} apiRefresh={this.apiRefresh} />
        <div className="container">
          <AppRouter api={this.state.api} />
        </div>
      </div>}
    else{
      console.log("bottom")
      return <div className="App">
        <div className="container">
          <Login />
        </div>
      </div>
    }
  }

  render() {

    console.log(this.state.api)
    if (this.state.loaded) {
      return (
        (this.authenticated())
        // <div className="App">

        //   <NavBar api={this.state.api} apiRefresh={this.apiRefresh} />
        //   <div className="container">
        //     <AppRouter api={this.state.api} />
        //   </div>
        //   <div className="container">
        //     <Login />
        //   </div>
        // </div>
      );
    } else {
      return <h1>Loading</h1>
    }
  }
}

export default App;
