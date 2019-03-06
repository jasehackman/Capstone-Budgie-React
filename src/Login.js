import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Route, Redirect, Link } from "react-router-dom"

// TODO: Error handeling. Ask joe how to handle errors

class Login extends Component {

  state = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    login: false,
    register: false,

    loginError: false,
    registerError: false
  }

  login() {
    if (this.state.username === '' || this.state.password === '') {
      this.setState({ loginError: true })
      return
    } else {
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
          this.setState({ login: true })
        })
    }
  }

  register() {
    // validation to make sure no info is blank
    if (this.state.username === '' || this.state.password === '' || this.state.first_name === '' || this.state.last_name === '' || this.state.email === '') {
      this.setState({ registerError: true })
      return
    } else {
      // builds object to send
      let creds = {
        username: this.state.username,
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email
      }

      fetch('http://127.0.0.1:8000/register', {

        method: 'POST',
        body: JSON.stringify(creds),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(data => data.json())
        .then(token => {
          localStorage.setItem("user", creds.username)
          localStorage.setItem("token", token.token)
          this.setState({ login: true })
        }).catch((err) => {
          console.log("error", err)
        })
    }
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  registerToggle() {
    // toggles register on and off and clears errors
    this.setState({
      register: !this.state.register,
      loginError: false,
      registerError: false
     })
  }

  errors(){
    //handles blank fields
    let er = ""
    if(this.state.loginError){
      er = <p className="alert alert-danger">incorrect email or password</p>

    }else if(this.state.registerError){
      er = <p className="alert alert-danger">all fields required</p>

    }
    return er
  }

  whichForm() {
    if (!this.state.register) {
      return (
        <Form>
          <h4>Login</h4>
          {this.errors()}
          <FormGroup>
            <Label>Username</Label>
            <Input type="text" id="username" onChange={(e) => this.handleFieldChange(e)} required />

          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <Input type="password" id="password" onChange={(e) => this.handleFieldChange(e)} required />

          </FormGroup>

          <Button onClick={() => this.login()}>Login</Button>
          <Button onClick={() => this.registerToggle()}>Register</Button>

        </Form>
      )
    } else if (this.state.register) {
      return (
        <Form>
          <h4>Register</h4>
          {this.errors()}
          <FormGroup>
            <Label>Username</Label>
            <Input type="text" id="username" onChange={(e) => this.handleFieldChange(e)} required />

          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <Input type="password" id="password" onChange={(e) => this.handleFieldChange(e)} required />

          </FormGroup>

          <FormGroup>
            <Label>First Name</Label>
            <Input type="text" id="first_name" onChange={(e) => this.handleFieldChange(e)} required />

          </FormGroup>

          <FormGroup>
            <Label>Last Name</Label>
            <Input type="text" id="last_name" onChange={(e) => this.handleFieldChange(e)} required />

          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" id="email" onChange={(e) => this.handleFieldChange(e)} required />

          </FormGroup>

          <Button onClick={() => this.register()}>Register</Button>
          <Button onClick={() => this.registerToggle()}>Login</Button>

        </Form>
      )
    }
  }


  render() {
    if (this.state.login) {
      return (<Redirect to='/' />)


    } else {
      return (

        <div className="card">
          {this.whichForm()}
        </div>
      )
    }
  }
}

export default Login;
