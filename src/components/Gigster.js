import React, { Component } from 'react';
import ApplicationViews from "./ApplicationViews";
import DataManager from '../modules/DataManager'
import './Gigster.css';
import "bootstrap/dist/css/bootstrap.min.css"

class Gigster extends Component {
  state = {
    users: [],
    currentUser: [],
    artists: [],
    artistToSongs: [],
    songs: [],
    sets: []
  };


  populateAppState () {
    let currentUser = [];
    DataManager.fetchData({
      "dataSet" : "users",
      "fetchType" : "GET",
      "dataBaseObject" : "",
      "embedItem" : ""
    })
    .then(users => {this.setState({users: users})})
    .then(() => {
      let user = this.state.users.find(user => user.id === Number(sessionStorage.getItem("user")))
      currentUser.push(user)
      this.setState({ currentUser: currentUser })
    })
    .then(() => DataManager.fetchData({
      "dataSet" : "artists",
      "fetchType" : "GET",
      "dataBaseObject" : "",
      "embedItem" : ""
    }))
    .then(artists => {
      // console.log(artists)
    })
  }


componentDidMount() {
  this.populateAppState()
}

  getAllUsers = () => {
    return DataManager.fetchData({
      "dataSet" : "users",
      "fetchType" : "GET",
      "dataBaseObject" : "",
      "embedItem" : "?_embed=artists"
    })
  //  .then(()=> this.populateAppState())
  }

  checkUserLogin = () => {
   return DataManager.fetchData({
        "dataSet" : "users",
        "fetchType" : "GET",
        "dataBaseObject" : "",
        "embedItem" : "_embed=songs"
    })
    // .then(() => DataManager.getAll("users"))
    // .then(allUsers => this.setState({
    //   users: allUsers}))
    }



  addUser = user =>
  DataManager.fetchData(user)
  .then(() => this.populateAppState())
  // .then(()=>this.checkUserLogin(user.username, user.password));

  render() {
    return (
      <ApplicationViews
        addUser={this.addUser}
        getAllUsers={this.getAllUsers}
        checkUserLogin={this.checkUserLogin} />
    );
  }
}

export default Gigster;
