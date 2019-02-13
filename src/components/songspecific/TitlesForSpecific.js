import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

export default class TitlesForSpecific extends Component {
  state= {
    editSongName: false,
    songName:this.props.song.songName,
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  songNameChange = () => {
    this.setState({songName:this.props.song.songName})
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

    this.props.specificSongForSongSpecificFunc(songUpdate)
    this.setState({editSongName: false})
  }
  render() {
    return (
      <React.Fragment>
      {this.state.editSongName ?
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <Button variant="dark" onClick={this.saveNewSongName}>Save</Button>
          </InputGroup.Prepend>
          <FormControl aria-describedby="basic-addon1" id="songName" value={this.state.songName} onChange={this.handleFieldChange} />
        </InputGroup>
        : <h2>{this.props.song.songName}<p
        href="#"
        className="edit-name"
        onClick={this.songNameChange}>   editSongName</p></h2>}

    <p>{this.props.song.writer}<br></br>-{this.props.song.genre}</p>
    </React.Fragment>
    )
  }
}