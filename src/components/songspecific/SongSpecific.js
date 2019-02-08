import React, { Component } from 'react';
import YoutubeHolder from './YoutubeHolder'
import ChordsForSpecific from './ChordsForSpecific'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"


export default class SongSpecific extends Component {
  state = {
    editNote: false,
    editUrl: false,
    notes: this.props.selectedArtistForSongsList.notes,
    url: this.props.selectedArtistForSongsList.url
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  youtubeURLchange = () => {
    this.setState({editUrl: true})
  }


  setNoteEditing = () => {
    this.setState({editNote: true})
  }

  youtubeSaveUrl = () => {
    console.log("youSaved")
    let songUpdate = {
      "id" : this.props.selectedArtistForSongsList.id,
      userId: this.props.selectedArtistForSongsList.userId,
      songName: this.props.selectedArtistForSongsList.songName,
      genre: this.props.selectedArtistForSongsList.genre,
      writer: this.props.selectedArtistForSongsList.writer,
      progression: this.props.selectedArtistForSongsList.progression,
      url: this.state.url,
      "notes": this.props.selectedArtistForSongsList.notes,
    }
    this.props.addToJson({
    "putId" :this.props.selectedArtistForSongsList.id,
    "dataSet" : "songs",
    "fetchType" : "PUT",
    "dataBaseObject" : songUpdate
    });
    this.props.specificSongForSongSpecific(songUpdate)
    this.setState({editUrl: false})
  }

  saveNewNotes = () => {
    console.log("saving")
    let songUpdate = {
      "id" : this.props.selectedArtistForSongsList.id,
      userId: this.props.selectedArtistForSongsList.userId,
      songName: this.props.selectedArtistForSongsList.songName,
      genre: this.props.selectedArtistForSongsList.genre,
      writer: this.props.selectedArtistForSongsList.writer,
      progression: this.props.selectedArtistForSongsList.progression,
      url: this.props.selectedArtistForSongsList.url,
      "notes": this.state.notes
    }
    this.props.addToJson({
    "putId" :this.props.selectedArtistForSongsList.id,
    "dataSet" : "songs",
    "fetchType" : "PUT",
    "dataBaseObject" : songUpdate
    });

    this.props.specificSongForSongSpecific(songUpdate)
    this.setState({editNote: false})
  }
  render() {
    return (
      <div>
        <Link to="/home">
          <Button variant="secondary" size="lg">Return to All Artists</Button>
        </Link>
        <Link to="/songs">
          <Button variant="outline-dark" size="lg">Return to Artist Library</Button>
        </Link>
          <h2>{this.props.selectedArtistForSongsList.songName}
            <p href="#" className="edit-name">   editSongName
            </p>
          </h2>
          <p>{this.props.selectedArtistForSongsList.writer}<br></br>-{this.props.selectedArtistForSongsList.genre}</p>
          <YoutubeHolder selectedArtistForSongsList={this.props.selectedArtistForSongsList}/>
          {this.state.editUrl ? <Button onClick={this.youtubeSaveUrl} variant="danger">Save New Youtube URL</Button> : <Button variant="secondary" onClick={this.youtubeURLchange}>Change Video Link</Button>}
          {this.state.editUrl ? <input type="text" id="url" value={this.state.url} className="youtube-url-new" onChange={this.handleFieldChange}/> : null}
          <ChordsForSpecific
          selectedArtistForSongsList={this.props.selectedArtistForSongsList}
          addToJson={this.props.addToJson}
          specificSongForSongSpecific={this.props.specificSongForSongSpecific} />
        <section className="notesForSong">
          <h3>Notes:
            <p href="#" onClick={this.setNoteEditing} className="edit-name">   editNotes
            </p>
          </h3>
          {this.state.editNote ? <textarea type="text" value={this.state.notes} onChange={this.handleFieldChange} id="notes"/> : <p>{this.props.selectedArtistForSongsList.notes}</p>}
          {this.state.editNote ? <Button onClick={this.saveNewNotes} variant="dark">Save</Button> : null}
        </section>
      </div>
    )
  }
}