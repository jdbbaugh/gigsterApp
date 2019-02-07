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
    this.setState({editProgression: false})
  }
  render() {
    return (
      <section className="progressionForSong">
        <h4>Chord Chart:<a className="edit-name" onClick={this.progressionEditing}>   editChart</a></h4>
        {!this.state.editProgression ? <h2>{this.props.selectedArtistForSongsList.progression}</h2> :
          <InputGroup>
            <InputGroup.Prepend>
              <Button variant="danger" onClick={this.saveProgression}>Save Changes</Button>
            </InputGroup.Prepend>
            <FormControl as="textarea" id="progression" value={this.props.selectedArtistForSongsList.progression} onChange={this.handleFieldChange} aria-label="With textarea" />
          </InputGroup>}
      </section>
    )
  }
}