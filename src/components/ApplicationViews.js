import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import Login from "./userlogin/Login"
import Register from "./userlogin/Register"

export default class ApplicationViews extends Component {
  render() {
    return (
<React.Fragment>
  <Route exact path="/" render={props => {
    return <Login {...props}
      checkUserLogin={this.props.checkUserLogin} />
      }}/>
  <Route path="/register" render={props => {
    return <Register {...props}
      addUser={this.props.addUser}
      users={this.props.users}
      getAllUsers={this.props.getAllUsers}/>
      }}/>
</React.Fragment>
    )
  }
}