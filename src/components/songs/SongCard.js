import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"

export default class SongCard extends Component {
  state = {
    editSongName: false,
    songName: this.props.song.songName
  }

  toSpecificSong = evt => {
    this.props.sendToSongSpecific(this.props.song)
  }

songToDelete = () => {
  this.props.deleteSongFromJson(this.props.song.id)
}

handleFieldChange = evt => {
  const stateToChange = {}
  stateToChange[evt.target.id] = evt.target.value
  this.setState(stateToChange)
}

songNameChange = () => {
  this.setState({editSongName: true})
}

saveNewSongName = () => {
  console.log("saving songName")
  let songUpdate = {
    "id" : this.props.song.id,
    userId: this.props.song.userId,
    songName: this.state.songName,
    genre: this.props.song.genre,
    writer: this.props.song.writer,
    progression: this.props.song.progression,
    url: this.props.song.url,
    "notes": this.props.song.notes
  }
  this.props.addToJson({
  "putId" :this.props.song.id,
  "dataSet" : "songs",
  "fetchType" : "PUT",
  "dataBaseObject" : songUpdate
  });

  this.props.specificSongForSongSpecific(songUpdate)
  this.setState({editSongName: false})
}

  render() {
    // console.log(this.props.artistToSongs)

    if (this.props.artistToSongs.find(
      artistToSong => artistToSong.songId === this.props.song.id && artistToSong.artistId === this.props.selectedArtistForSongsList)) {
    return (
      <Card className="artist-specific-container" style={{ width: '18rem' }}>
        <Card.Body>
        {this.state.editSongName ?
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <Button variant="dark" onClick={this.saveNewSongName}>Save</Button>
            </InputGroup.Prepend>
            <FormControl aria-describedby="basic-addon1" id="songName" value={this.state.songName} onChange={this.handleFieldChange} />
          </InputGroup>
        : <Card.Title>{this.props.song.songName}<p className="edit-name" onClick={this.songNameChange}>   editSongTitle</p></Card.Title>}
        <Link to={`/specificsong/${this.props.selectedArtistForSongsList}/${this.props.song.id}`}>
            <Button
              onClick={this.toSpecificSong}
              variant="dark">
                Work This Song
            </Button>
            </Link>
            <Button variant="outline-secondary" onClick={this.songToDelete}>Delete Song</Button>
        </Card.Body>
      </Card>
    )
  } else {
    return null
  }
  }
}