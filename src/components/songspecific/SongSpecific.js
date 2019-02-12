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
    editWriter: false,
    editGenre: false,
    editSongName: false,
    songName:this.props.selectedArtistForSongsList.songName,
    writer:this.props.selectedArtistForSongsList.writer,
    genre:this.props.selectedArtistForSongsList.genre,
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
  writerChange = () => {
    this.setState({editWriter: true})
  }
  genreChange = () => {
    this.setState({editGenre: true})
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
      "notes": this.props.selectedArtistForSongsList.notes
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
  saveNewWriter = () => {
    let songUpdate = {
      "id" : this.props.selectedArtistForSongsList.id,
      userId: this.props.selectedArtistForSongsList.userId,
      songName: this.props.selectedArtistForSongsList.songName,
      genre: this.props.selectedArtistForSongsList.genre,
      writer: this.state.writer,
      progression: this.props.selectedArtistForSongsList.progression,
      url: this.props.selectedArtistForSongsList.url,
      "notes": this.props.selectedArtistForSongsList.notes
    }
    this.props.addToJson({
    "putId" :this.props.selectedArtistForSongsList.id,
    "dataSet" : "songs",
    "fetchType" : "PUT",
    "dataBaseObject" : songUpdate
    });

    this.props.specificSongForSongSpecific(songUpdate)
    this.setState({editWriter: false})
  }
  saveNewGenre = () => {
    let songUpdate = {
      "id" : this.props.selectedArtistForSongsList.id,
      userId: this.props.selectedArtistForSongsList.userId,
      songName: this.props.selectedArtistForSongsList.songName,
      genre: this.state.genre,
      writer: this.props.selectedArtistForSongsList.writer,
      progression: this.props.selectedArtistForSongsList.progression,
      url: this.props.selectedArtistForSongsList.url,
      "notes": this.props.selectedArtistForSongsList.notes
    }
    this.props.addToJson({
    "putId" :this.props.selectedArtistForSongsList.id,
    "dataSet" : "songs",
    "fetchType" : "PUT",
    "dataBaseObject" : songUpdate
    });

    this.props.specificSongForSongSpecific(songUpdate)
    this.setState({editGenre: false})
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

            {this.state.editSongName ?
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <Button variant="dark" onClick={this.saveNewSongName}>Save</Button>
                </InputGroup.Prepend>
                <FormControl aria-describedby="basic-addon1" id="songName" value={this.state.songName} onChange={this.handleFieldChange} />
              </InputGroup>
              : <h2>{this.props.selectedArtistForSongsList.songName}<p
              href="#"
              className="edit-name"
              onClick={this.songNameChange}>   editSongName</p></h2>}

          {this.state.editWriter ?
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <Button variant="dark" onClick={this.saveNewWriter}>Save</Button>
                </InputGroup.Prepend>
                <FormControl aria-describedby="basic-addon1" id="writer" value={this.state.writer} onChange={this.handleFieldChange} />
              </InputGroup>
              : <p onClick={this.writerChange}>{this.props.selectedArtistForSongsList.writer}</p>}
          {this.state.editGenre ?
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <Button variant="dark" onClick={this.saveNewGenre}>Save</Button>
                </InputGroup.Prepend>
                <FormControl aria-describedby="basic-addon1" id="genre" value={this.state.genre} onChange={this.handleFieldChange} />
              </InputGroup>
              : <p onClick={this.genreChange}>-{this.props.selectedArtistForSongsList.genre}</p>}

          <YoutubeHolder selectedArtistForSongsList={this.props.selectedArtistForSongsList}/>
          {this.state.editUrl ? <Button onClick={this.youtubeSaveUrl} variant="danger">Save New Youtube URL</Button> : <Button variant="secondary" onClick={this.youtubeURLchange}>Change Video Link</Button>}
          {this.state.editUrl ? <input type="text" id="url" value={this.state.url} className="youtube-url-new" onChange={this.handleFieldChange}/> : null}
          <ChordsForSpecific
          selectedArtistForSongsList={this.props.selectedArtistForSongsList}
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
          </InputGroup> : <p>{this.props.selectedArtistForSongsList.notes}</p>}
        </section>



      </div>
    )
  }
}