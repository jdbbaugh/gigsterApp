import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import Login from "./userlogin/Login"
import Register from "./userlogin/Register"
import Home from "./homepage/Home"
import SongsList from "./songs/SongsList"
import SongSpecific from "./songspecific/SongSpecific"

export default class ApplicationViews extends Component {
  state = {
    selectedArtistForSongsList: [],
    specificSongForSongSpecific: []
  }

  isAuthenticated = () => sessionStorage.getItem("user") !== null

  artistSelectedByUser = selectedArtist => {
    // console.log("But for real Artist is:",selectedArtist);
    this.setState({ selectedArtistForSongsList: selectedArtist })
  }

  specificSongForSongSpecificFunc = selectedSong => {
    this.setState({ specificSongForSongSpecific: selectedSong })
  }

  deleteSongFromJson = (toDelete) => {
    console.log("deleting", toDelete)

    let deleteSongFromArtistToSong = this.props.artistToSongs.find(artistToSong => artistToSong.songId === toDelete);
    // console.log("artistToSong", deleteSongFromArtistToSong.songId, deleteSongFromArtistToSong.id );
    this.props.addToJson({
      "deleteId": deleteSongFromArtistToSong.id,
      "dataSet": "artistToSongs",
      "fetchType": "DELETE"

    }).then(() => {
      this.props.addToJson({
        "deleteId": toDelete,
        "dataSet": "songs",
        "fetchType": "DELETE"
      });
    })
  }

  deleteArtistLibrary = (toDelete) => {
    console.log("deleting", toDelete)

    let deleteSongFromArtistToSong = this.props.artistToSongs.filter(artistToSong => artistToSong.songId === toDelete);
    // console.log("artistToSong", deleteSongFromArtistToSong.songId, deleteSongFromArtistToSong.id );
    return Promise.all(deleteSongFromArtistToSong.map(artistToSong =>
      this.props.addToJson({
        "deleteId": artistToSong.id,
        "dataSet": "artistToSongs",
        "fetchType": "DELETE"

      })
    ))
      .then(() => {
        this.props.addToJson({
          "deleteId": toDelete,
          "dataSet": "songs",
          "fetchType": "DELETE"
        })
      })
  };

  deleteArtistFromJson = (toDelete) => {
    console.log("deleting Artist", toDelete);
    Promise.all(toDelete.artistToSongs.map(artistToSong =>
      this.deleteArtistLibrary(artistToSong.songId)
    ))
    .then(() => {
    this.props.addToJson({
      "deleteId": toDelete.id,
      "dataSet": "artists",
      "fetchType": "DELETE"
    });
  })
  }



  render() {
    // console.log("Sets top of Appview",this.props.sets)

    if (this.props.artists.length === 0) {
      return null
    }
    return (
      <React.Fragment>
        <Route exact path="/" render={props => {
          return <Login {...props}
            checkUserLogin={this.props.checkUserLogin} />
        }} />
        <Route path="/register" render={props => {
          return <Register {...props}
            addToJson={this.props.addToJson}
            users={this.props.users}
            getAllUsers={this.props.getAllUsers} />
        }} />
        <Route path="/home" render={props => {
          if (this.isAuthenticated()) {
            return <Home
              artists={this.props.artists}
              addToJson={this.props.addToJson}
              artistSelectedByUser={this.artistSelectedByUser}
              deleteArtistFromJson={this.deleteArtistFromJson} />
          } else {
            return <Redirect to='/' />
          }
        }} />
        <Route path="/songs/:artistId(\d+)" render={props => {
          if (this.isAuthenticated()) {
            return <SongsList
              {...props}
              artists={this.props.artists}
              addNewSongToJson={this.props.addNewSongToJson}
              songs={this.props.songs}
              artistToSongs={this.props.artistToSongs}
              addToJson={this.props.addToJson}
              selectedArtistForSongsList={this.state.selectedArtistForSongsList}
              specificSongForSongSpecificFunc={this.specificSongForSongSpecificFunc}
              deleteSongFromJson={this.deleteSongFromJson}
              sets={this.props.sets} />
          } else {
            return <Redirect to='/' />
          }
        }} />
        <Route path="/specificsong/:artistId(\d+)/:songId(\d+)" render={props => {
          if (this.isAuthenticated()) {
            return <SongSpecific
              {...props}
              artists={this.props.artists}
              selectedArtistForSongsList={this.state.specificSongForSongSpecific}
              specificSongForSongSpecificFunc={this.specificSongForSongSpecificFunc}
              addToJson={this.props.addToJson}
              songs={this.props.songs}
              artistSelectedByUser={this.artistSelectedByUser} />
          } else {
            return <Redirect to='/' />
          }
        }} />
      </React.Fragment>
    )
  }
}