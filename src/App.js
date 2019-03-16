import React, { Component } from 'react'
import NavBar from './NavBar.js'
import AppRouter from './AppRouter.js'
import Login from './Login.js'
import APICalls from './modules/APICalls.js'

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
    APICalls.get(this.state.apiurl)
      .then(api => {
        this.setState({ api })
        this.setState({ loaded: true })
      })

  }

  authenticated() {
    if (localStorage.getItem('token')) {
      return <div className="App">
        <NavBar api={this.state.api} apiRefresh={this.apiRefresh} />
        <div className="container mt-4">
          <AppRouter api={this.state.api} />
        </div>
      </div>
    }
    else {
      return <div className="App">
        <div className="container">
          <Login />
        </div>
      </div>
    }
  }

  render() {

    if (this.state.loaded) {
      return (
        (this.authenticated())
      )
    } else {
      return <h1>Loading</h1>
    }
  }
}

export default App
