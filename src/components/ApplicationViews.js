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
      "deleteId": toDelete,
      "dataSet": "songs",
      "fetchType": "DELETE"

    }).then(() => {
      this.props.addToJson({
        "deleteId": deleteSongFromArtistToSong.id,
        "dataSet": "artistToSongs",
        "fetchType": "DELETE"
      });
    })
  }





  deleteArtistLibrary = (toDelete) => {
    console.log("deleting", toDelete)

    // if (toDelete.setId > 1 && this.props.sets.find(set => set.id === toDelete.setId)) {
    //   this.props.addToJson({
    //     "deleteId": toDelete.setId,
    //     "dataSet": "sets",
    //     "fetchType": "DELETE"
    //   })
    //   .then(() => {
    //     if (this.props.songs.find(song => song.id === toDelete.songId)) {
    //       this.props.addToJson({
    //       "deleteId": toDelete.songId,
    //       "dataSet": "songs",
    //       "fetchType": "DELETE"
    //       })
    //       .then(() => {
    //         this.props.addToJson({
    //         "deleteId": toDelete.id,
    //         "dataSet": "artistToSongs",
    //         "fetchType": "DELETE"
    //         })
    //       })
    //     } else {
    //       this.props.addToJson({
    //         "deleteId": toDelete.id,
    //         "dataSet": "artistToSongs",
    //         "fetchType": "DELETE"
    //       })
    //     }
    //   })
    // } else if (this.props.songs.find(song => song.id === toDelete.songId)) {
    //   this.props.addToJson({
    //     "deleteId": toDelete.songId,
    //     "dataSet": "songs",
    //     "fetchType": "DELETE"
    //   })
    //   .then(() => {
    //     this.props.addToJson({
    //       "deleteId": toDelete.id,
    //       "dataSet": "artistToSongs",
    //       "fetchType": "DELETE"
    //     })
    //   })
    // } else {
    //   this.props.addToJson({
    //     "deleteId": toDelete.id,
    //     "dataSet": "artistToSongs",
    //     "fetchType": "DELETE"
    //   })
    // }
  };

  deleteArtistFromJson = (toDelete) => {
    console.log("deleting Artist", toDelete);
    let songsToDelete = [];
    let setsToDelete = [];
    let artistToSongToDelete = [];

    toDelete.artistToSongs.forEach(artistToSong => {
      if (artistToSong.setId > 1) {
        setsToDelete.push(artistToSong.setId)
    }

      songsToDelete.push(artistToSong.songId)
      artistToSongToDelete.push(artistToSong.id)

    })
    console.log(songsToDelete, setsToDelete)
    this.promiseForDeleteArtistToSongs(artistToSongToDelete, 0)
    .then(() => console.log("resolved"))
    //artistToSonglistaRray sent to a function that will allow the needed function to return a promise upon completion

  //   Promise.all(toDelete.artistToSongs.map(artistToSong =>
  //     this.deleteArtistLibrary(artistToSong)
  //   ))
  //   .then(() => {
  //   this.props.addToJson({
  //     "deleteId": toDelete.id,
  //     "dataSet": "artists",
  //     "fetchType": "DELETE"
  //   });
  // })
  }
//from promiseForDeleteArtistToSongs function we get all the needed data plus resolve so that function can declare promise resolution
  deleteArtistToSongs = (artistToSongsIds, artistToSongIndex, resolve) => {
    console.log(artistToSongsIds,"index",artistToSongIndex)
    if (artistToSongIndex < artistToSongsIds.length) {
      let indexToDelete = artistToSongsIds[artistToSongIndex]
      this.props.addNewSongToJson({
        "deleteId": indexToDelete,
        "dataSet": "artistToSongs",
        "fetchType": "DELETE"
      }).then(() => {
        // setTimeout(() => this.deleteArtistToSongs(artistToSongsIds, artistToSongIndex + 1 ), 35) ...this cheat technically works but doesnt provide a promise return to function that called this function
        console.log("success")
        this.deleteArtistToSongs(artistToSongsIds, artistToSongIndex + 1, resolve )
    })
    .catch(() => {
      console.log("failed")
      this.deleteArtistToSongs(artistToSongsIds, artistToSongIndex, resolve)
    })
    } else {
      console.log("all artistToSongs Deleted");
      resolve()
    }
  }
  //if json fails catch will restart the process at the failing point when all artistToSongs are deleted
  //then resolve will let promiseForDeleteArtistToSongs return a fulfilled promise to deleteArtistFromJson function


  //Here we pass deleted artistToSongs array so that it will be able to send back promise upon accomplishing of deleteArtistToSongs
  promiseForDeleteArtistToSongs = (artistToSongsIds, artistToSongIndex) => {
    return new Promise((resolve, reject) => {
      this.deleteArtistToSongs(artistToSongsIds, artistToSongIndex, resolve)
    } )
  }
  //now its sent to the deleteArtistToSongs function with the addition of resolve from new Promise method... this will allow it to send a resolved promise later



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
        <Route path="/songs/:artistId(\d+)/set/:setId(\d+)" render={props => {
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
              sets={this.props.sets}
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