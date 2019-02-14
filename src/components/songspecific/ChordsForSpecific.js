import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

export default class ChordsForSpecific extends Component {
  state = {
    editProgression: false,
    progression: this.props.song.progression
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  progressionEditing = () => {
    this.setState({editProgression: true})
    this.setState({progression: this.props.song.progression})
  }

  saveProgression = () => {
    console.log('clickity')
    let songUpdate = {
      "id" : this.props.song.id,
      userId: this.props.song.userId,
      songName: this.props.song.songName,
      genre: this.props.song.genre,
      writer: this.props.song.writer,
      progression: this.state.progression,
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
    this.setState({editProgression: false})
  }
  render() {
    return (
      <section className="progressionForSong">
      {this.props.song.progression === "" ?
      <Button onClick={this.progressionEditing} variant="dark">Add Chords</Button> :
        <h4>Chord Chart:
          <p href="#" className="edit-name" onClick={this.progressionEditing}>   editChart
          </p>
        </h4>}
        {!this.state.editProgression ? <h2>{this.props.song.progression}</h2> :
          <InputGroup>
            <InputGroup.Prepend>
              <Button variant="dark" onClick={this.saveProgression}>Save Changes</Button>
            </InputGroup.Prepend>
            <FormControl as="textarea" id="progression" value={this.state.progression} onChange={this.handleFieldChange} aria-label="With textarea" />
          </InputGroup>}
      </section>
    )
  }
}