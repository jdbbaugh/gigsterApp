import React, { Component } from 'react';
import YoutubeHolder from './YoutubeHolder'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import ChordsForSpecific from './ChordsForSpecific'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"


export default class SongSpecific extends Component {
  state = {
    editNote: false,
    editUrl: false,
    editSongName: false,
    songName:this.props.selectedArtistForSongsList.songName,
    notes: this.props.selectedArtistForSongsList.notes,
    url: this.props.selectedArtistForSongsList.url
  }


  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  songNameChange = () => {
    this.setState({editSongName: true})
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

  saveNewSongName = () => {
    console.log("saving songName")
    let songUpdate = {
      "id" : this.props.selectedArtistForSongsList.id,
      userId: this.props.selectedArtistForSongsList.userId,
      songName: this.state.songName,
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
    this.setState({editSongName: false})
  }
  render() {
    const artist = this.props.artists.find(artist => artist.id === parseInt(this.props.match.params.artistId)) || {}
    const song = this.props.songs.find(song => song.id === parseInt(this.props.match.params.songId)) || {}
    return (
      <div>
        <Link to="/home">
          <Button variant="secondary" size="lg">Return to All Artists</Button>
        </Link>
        <Link to={`/songs/${artist.id}`}>
          <Button variant="outline-dark" size="lg">Return to Artist Library</Button>
        </Link>

            {this.state.editSongName ?
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <Button variant="dark" onClick={this.saveNewSongName}>Save</Button>
                </InputGroup.Prepend>
                <FormControl aria-describedby="basic-addon1" id="songName" value={this.state.songName} onChange={this.handleFieldChange} />
              </InputGroup>
              : <h2>{song.songName}<p
              href="#"
              className="edit-name"
              onClick={this.songNameChange}>   editSongName</p></h2>}

          <p>{song.writer}<br></br>-{song.genre}</p>
          <YoutubeHolder selectedArtistForSongsList={song}/>
          {this.state.editUrl ? <Button onClick={this.youtubeSaveUrl} variant="danger">Save New Youtube URL</Button> : <Button variant="secondary" onClick={this.youtubeURLchange}>Change Video Link</Button>}
          {this.state.editUrl ? <input type="text" id="url" value={this.state.url} className="youtube-url-new" onChange={this.handleFieldChange}/> : null}
          <ChordsForSpecific
          selectedArtistForSongsList={song}
          addToJson={this.props.addToJson}
          specificSongForSongSpecific={this.props.specificSongForSongSpecific} />
        <section className="notesForSong">
          <h3>Notes:
            <p onClick={this.setNoteEditing} className="edit-name">   editNotes
            </p>
          </h3>
          {this.state.editNote ? <InputGroup>
            <InputGroup.Prepend>
              <Button variant="dark" onClick={this.saveNewNotes}>Save Changes</Button>
            </InputGroup.Prepend>
            <FormControl as="textarea" id="notes" value={this.state.notes} onChange={this.handleFieldChange} aria-label="With textarea" />
          </InputGroup> : <p>{song.notes}</p>}
        </section>



      </div>
    )
  }
}