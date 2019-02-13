import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

export default class NotesForSpecific extends Component {
  state = {
    editNote: false,
    notes: this.props.song.notes,
  }
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }
  setNoteEditing = () => {
    this.setState({editNote: true})
    this.setState({notes: this.props.song.notes,})
  }
  saveNewNotes = () => {
    console.log("saving")
    let songUpdate = {
      "id" : this.props.song.id,
      userId: this.props.song.userId,
      songName: this.props.song.songName,
      genre: this.props.song.genre,
      writer: this.props.song.writer,
      progression: this.props.song.progression,
      url: this.props.song.url,
      "notes": this.state.notes
    }
    this.props.addToJson({
    "putId" :this.props.song.id,
    "dataSet" : "songs",
    "fetchType" : "PUT",
    "dataBaseObject" : songUpdate
    });

    this.props.specificSongForSongSpecificFunc(songUpdate)
    this.setState({editNote: false})
  }

  render() {
    return (
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
          </InputGroup> : <p>{this.props.song.notes}</p>}
        </section>
    )
  }
}