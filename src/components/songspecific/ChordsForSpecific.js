import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

export default class ChordsForSpecific extends Component {
  state = {
    editProgression: false
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
            <FormControl as="textarea" aria-label="With textarea" />
          </InputGroup>}
      </section>
    )
  }
}