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
      "fetchType" : "GET"
    })
    .then(users => {this.setState({ users })})
    .then(() => {
      let user = this.state.users.find(user => user.id === Number(sessionStorage.getItem("user")))
      currentUser.push(user)
      if (currentUser < 1) {
        return null
      } else {

        this.setState({ currentUser: currentUser })
      }
    })
    .then(() => DataManager.fetchData({
      "dataSet" : "artists",
      "fetchType" : "GET",
      "dataBaseObject" : "",
      "embedItem" : "_embed=artistToSongs"
    }))
    .then(artists => {this.setState({ artists })})
    .then(() => console.log(this.state))
    .then(() => DataManager.fetchData({
      "dataSet" : "songs",
      "fetchType" : "GET",
      "dataBaseObject" : "",
      "embedItem" : "_embed=users"
    }))
    .then(songs => {this.setState({ songs })})
    .then(() => DataManager.fetchData({
      "dataSet" : "artistToSongs",
      "fetchType" : "GET",
      "dataBaseObject" : "",
      "embedItem" : "_embed=artists"
    }))
    .then(artistToSongs => {this.setState({ artistToSongs })})

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



  addToJson = addThis =>
  DataManager.fetchData(addThis)
  .then((i) => {
    this.populateAppState()
    console.log(i)})// .then(()=>this.checkUserLogin(user.username, user.password));


  render() {
    return (
      <ApplicationViews
        addToJson={this.addToJson}
        getAllUsers={this.getAllUsers}
        checkUserLogin={this.checkUserLogin}
        artists={this.state.artists}
        artistToSongs={this.state.artistToSongs}
        songs={this.state.songs} />
    );
  }
}

export default Gigster;
