import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import Login from "./userlogin/Login"
import Register from "./userlogin/Register"
import Home from "./homepage/Home"
import SongsList from "./songs/SongsList"

export default class ApplicationViews extends Component {
  state = {
    selectedArtistForSongsList: 0
  }

  artistSelectedByUser = selectedArtist => {
    // console.log("But for real Artist is:",selectedArtist);
    this.setState({selectedArtistForSongsList: selectedArtist})
  }

  render() {

    if (this.props.artists.length === 0) {
      return null
    }

    // console.log(this.props.artists[0])
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
      addToJson={this.props.addToJson}
      artistSelectedByUser={this.artistSelectedByUser} />
      }}/>
      <Route path="/songs" render={props => {
    return <SongsList
      artists={this.props.artists}
      addNewSongToJson={this.props.addNewSongToJson}
      songs={this.props.songs}
      artistToSongs={this.props.artistToSongs}
      addToJson={this.props.addToJson}
      selectedArtistForSongsList={this.state.selectedArtistForSongsList} />
      }}/>
</React.Fragment>
    )
  }
}