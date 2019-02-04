import React, { Component } from 'react';
import ApplicationViews from "./ApplicationViews";
import DataManager from '../modules/DataManager'
import './Gigster.css';
import "bootstrap/dist/css/bootstrap.min.css"

class Gigster extends Component {
  state = {
    users: [],
    artists: [],
    artistToSongs: [],
    songs: [],
    sets: []
  };

  getAllUsers = () => {
    return DataManager.fetchData({
      "dataSet" : "users",
      "fetchType" : "GET",
      "dataBaseObject" : "",
      "embedItem" : "?_embed=artists"
    })
  //  .then(()=> this.populateAppState())
  }



  addUser = user =>
  DataManager.fetchData(user)
  .then(() => this.populateAppState())
  .then(()=>this.registerHere(user.username, user.password));

  render() {
    return (
      <ApplicationViews
        addUser={this.addUser}
        getAllUsers={this.getAllUsers} />
    );
  }
}

export default Gigster;
