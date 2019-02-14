import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export default class SongNewSet extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.songAvailForSetSelection ?
          <InputGroup>
            <InputGroup.Prepend>
              <Button variant="dark" onClick={this.props.saveNewSet}>Save Changes</Button>
            </InputGroup.Prepend>
            <FormControl as="textarea" placeholder="Name Of New Set" id="progression"  onChange={this.handleFieldChange} aria-label="With textarea" />
          </InputGroup> : <Button onClick={this.props.addSongToSet} variant="">Create New Set</Button>}
      </React.Fragment>

    )
  }
}