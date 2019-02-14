import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export default class SongNewSet extends Component {
  state = {
    setName: ""
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  createdNewSetToJson = () => {
    console.log("youSavedNew Set")
    this.props.addToJson({
    "dataSet" : "sets",
    "fetchType" : "POST",
    "dataBaseObject" : {setName: this.state.setName}
    });
    this.props.saveNewSet()
  }

  render() {
    return (
      <React.Fragment>
        {this.props.songAvailForSetSelection ?
          <InputGroup>
            <InputGroup.Prepend>
              <Button variant="dark" onClick={this.createdNewSetToJson}>Save New Set</Button>
            </InputGroup.Prepend>
            <FormControl as="textarea" placeholder="Name Of New Set" id="setName"  onChange={this.handleFieldChange} aria-label="With textarea" />
          </InputGroup> : <Button onClick={this.props.addSongToSet} variant="">Create New Set</Button>}
      </React.Fragment>

    )
  }
}