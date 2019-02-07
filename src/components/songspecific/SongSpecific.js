import React, { Component } from 'react';
import YoutubeHolder from './YoutubeHolder'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"


export default class SongSpecific extends Component {
  state = {
    editNote: false,
    notes: ""
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  setNoteEditing = () => {
    this.setState({editNote: true})
  }
  saveNewNotes = () => {
    console.log("saving")
    this.props.addToJson({
    "putId" :this.props.selectedArtistForSongsList.id,
    "dataSet" : "songs",
    "fetchType" : "PUT",
    "dataBaseObject" : {
      "id" : this.props.selectedArtistForSongsList.id,
      userId: this.props.selectedArtistForSongsList.userId,
      songName: this.props.selectedArtistForSongsList.songName,
      genre: this.props.selectedArtistForSongsList.genre,
      writer: this.props.selectedArtistForSongsList.writer,
      progression: this.props.selectedArtistForSongsList.progression,
      url: this.props.selectedArtistForSongsList.url,
      "notes": this.state.notes
    }
    });
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

    this.props.specificSongForSongSpecific(songUpdate)
    this.setState({editNote: false})
  }
  render() {
    if (this.state.editNote) {
    return (
      <div>
        <Link to="/home">
        <Button variant="secondary" size="lg" block>Return to Artist Display</Button>
        </Link>
          <h2>{this.props.selectedArtistForSongsList.songName}</h2>
          <p>{this.props.selectedArtistForSongsList.writer}<br></br>-{this.props.selectedArtistForSongsList.genre}</p>
          <YoutubeHolder selectedArtistForSongsList={this.props.selectedArtistForSongsList}/>
        <section>
          <h3>Notes:<a className="edit-name">   editNotes</a></h3>
          <textarea type="text" onChange={this.handleFieldChange} id="notes"/>
          <Button onClick={this.saveNewNotes} variant="dark">Save</Button>
        </section>
      </div>
    )}
    return (
      <div>
        <Link to="/home">
        <Button variant="secondary" size="lg" block>Return to Artist Display</Button>
        </Link>
          <h2>{this.props.selectedArtistForSongsList.songName}</h2>
          <p>{this.props.selectedArtistForSongsList.writer}<br></br>-{this.props.selectedArtistForSongsList.genre}</p>
          <YoutubeHolder selectedArtistForSongsList={this.props.selectedArtistForSongsList}/>
        <section>
          <h3>Notes:<a onClick={this.setNoteEditing} className="edit-name">   editNotes</a></h3>
          <p>{this.props.selectedArtistForSongsList.notes}</p>
        </section>
      </div>
    )
  }
}