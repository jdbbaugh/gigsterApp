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
    specificSongForSongSpecific: ""
  }

  artistSelectedByUser = selectedArtist => {
    // console.log("But for real Artist is:",selectedArtist);
    this.setState({selectedArtistForSongsList: selectedArtist})
  }

  specificSongForSongSpecific = selectedSong => {
    this.setState({selectedArtistForSongsList: selectedSong})
  }

  deleteSongFromJson = (toDelete) => {
    console.log("deleting", toDelete)
    this.props.addToJson({

    "deleteId" : toDelete,
    "dataSet" : "songs",
    "fetchType" : "DELETE",
    "dataBaseObject" : {
      "userId": toDelete
    }
});

let deleteSongFromArtistToSong = this.props.artistToSongs.find(artistToSong => artistToSong.songId === toDelete);
// console.log("artistToSong", deleteSongFromArtistToSong.songId, deleteSongFromArtistToSong.id );
    this.props.addToJson({

    "deleteId" : deleteSongFromArtistToSong.id,
    "dataSet" : "artistToSongs",
    "fetchType" : "DELETE",
    "dataBaseObject" : {
      "userId": deleteSongFromArtistToSong.id
    }
});

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
      {...props}
      artists={this.props.artists}
      addNewSongToJson={this.props.addNewSongToJson}
      songs={this.props.songs}
      artistToSongs={this.props.artistToSongs}
      addToJson={this.props.addToJson}
      selectedArtistForSongsList={this.state.selectedArtistForSongsList}
      specificSongForSongSpecific={this.specificSongForSongSpecific}
      deleteSongFromJson={this.deleteSongFromJson} />
      }}/>
  <Route path="/specificsong" render={props => {
    return <SongSpecific
    selectedArtistForSongsList={this.state.selectedArtistForSongsList}
    specificSongForSongSpecific={this.specificSongForSongSpecific}
    addToJson={this.props.addToJson}
    songs={this.props.songs} />
      }}/>
</React.Fragment>
    )
  }
}