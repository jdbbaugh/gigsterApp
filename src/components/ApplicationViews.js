import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import Login from "./userlogin/Login"
import Register from "./userlogin/Register"
import Home from "./homepage/Home"
import SongsList from "./songs/SongsList"

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
      addToJson={this.props.addToJson}
      users={this.props.users}
      getAllUsers={this.props.getAllUsers}/>
      }}/>
      <Route path="/home" render={props => {
    return <Home
      artists={this.props.artists}
      addToJson={this.props.addToJson} />
      }}/>
      <Route path="/songs" render={props => {
    return <SongsList
      artists={this.props.artists}
      addToJson={this.props.addToJson} />
      }}/>
</React.Fragment>
    )
  }
}