import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Route, Redirect, Link } from "react-router-dom"



class Login extends Component {

  state = {
    username: '',
    password: '',
    login: false
  }

  login() {

    let creds = {
      username: this.state.username,
      password: this.state.password
    }
    fetch('http://127.0.0.1:8000/api-token-auth/', {
      method: 'POST',
      body: JSON.stringify(creds),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(data => data.json())
      .then(token => {
        localStorage.setItem("user", creds.username)
        localStorage.setItem("token", token.token)
        this.setState({login: true})
      })
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }


  render() {
    if (this.state.login) {
      return (<Redirect to='/' />)


    } else {
      return (

        <div className="card">
          <Form>
            <h4>Login</h4>

            <FormGroup>
              <Label>Username</Label>
              <Input type="text" id="username" onChange={(e) => this.handleFieldChange(e)} />

            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <Input type="password" id="password" onChange={(e) => this.handleFieldChange(e)} />

            </FormGroup>

            <Button onClick={() => this.login()}>Login</Button>
            <Button>Register</Button>

          </Form>
        </div>
      )
    }
  }
}

export default Login;
