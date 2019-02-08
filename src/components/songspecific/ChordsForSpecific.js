import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

export default class ChordsForSpecific extends Component {
  state = {
    editProgression: false,
    progression: this.props.selectedArtistForSongsList.progression
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  progressionEditing = () => {
    this.setState({editProgression: true})
  }

  saveProgression = () => {
    console.log('clickity')
    let songUpdate = {
      "id" : this.props.selectedArtistForSongsList.id,
      userId: this.props.selectedArtistForSongsList.userId,
      songName: this.props.selectedArtistForSongsList.songName,
      genre: this.props.selectedArtistForSongsList.genre,
      writer: this.props.selectedArtistForSongsList.writer,
      progression: this.state.progression,
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
    this.setState({editProgression: false})
  }
  render() {
    return (
      <section className="progressionForSong">
      {this.props.selectedArtistForSongsList.progression === "" ? <Button onClick={this.progressionEditing} variant="dark">Add Chords</Button>: <h4>Chord Chart:<a href="#" className="edit-name" onClick={this.progressionEditing}>   editChart</a></h4>}
        {!this.state.editProgression ? <h2>{this.props.selectedArtistForSongsList.progression}</h2> :
          <InputGroup>
            <InputGroup.Prepend>
              <Button variant="danger" onClick={this.saveProgression}>Save Changes</Button>
            </InputGroup.Prepend>
            <FormControl as="textarea" id="progression" value={this.state.progression} onChange={this.handleFieldChange} aria-label="With textarea" />
          </InputGroup>}
      </section>
    )
  }
}