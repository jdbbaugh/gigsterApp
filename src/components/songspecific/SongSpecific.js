import React, { Component } from 'react';
import YoutubeHolder from './YoutubeHolder'
import HeaderForSpecific from './HeaderForSpecific'
import NotesForSpecific from './NotesForSpecific'
import TitlesForSpecific from './TitlesForSpecific'
import ChordsForSpecific from './ChordsForSpecific'
import SpecificUrlEditor from './SpecificUrlEditor'


<<<<<<< HEAD
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
=======
>>>>>>> master


export default class SongSpecific extends Component {

<<<<<<< HEAD
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
=======

>>>>>>> master
  render() {
    const artist = this.props.artists.find(artist => artist.id === parseInt(this.props.match.params.artistId)) || {};
    const song = this.props.songs.find(song => song.id === parseInt(this.props.match.params.songId)) || {};

    return (
      <React.Fragment>
        <HeaderForSpecific
        artist={artist} />
        <TitlesForSpecific
        specificSongForSongSpecificFunc={this.props.specificSongForSongSpecificFunc}
        addToJson={this.props.addToJson}
        song={song} />

          <YoutubeHolder selectedArtistForSongsList={song}/>

<<<<<<< HEAD
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
=======
          <SpecificUrlEditor
>>>>>>> master
          addToJson={this.props.addToJson}
          specificSongForSongSpecificFunc={this.props.specificSongForSongSpecificFunc}
          song={song} />

          <ChordsForSpecific
          song={song}
          selectedArtistForSongsList={song}
          addToJson={this.props.addToJson}
          specificSongForSongSpecificFunc={this.props.specificSongForSongSpecificFunc} />

          <NotesForSpecific
          song={song}
          addToJson={this.props.addToJson}
          specificSongForSongSpecificFunc={this.props.specificSongForSongSpecificFunc} />
      </React.Fragment>
    )
  }
}