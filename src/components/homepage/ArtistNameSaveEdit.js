import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'


export default class ArtistNameSaveEdit extends Component {
  state = {
    "id": this.props.artist.id,
    "userId": this.props.artist.userId,
    "artistName": this.props.artist.artistName,
    "artistImageUrl": this.props.artist.artistImageUrl
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
}

  // constructNewArtistName = evt => {
  //   const artistEdited = {
  //     id: this.state.id,
  //     userId: this.state.userId,
  //     artistName: this.state.artistName,
  //     artistImageUrl: this.state.artistImageUrl
  //   }
  //   this.props.speciifyArtistIdToEdit(0)
  //   this.props.putMessage(this.state.id, artistEdited)
  // }

  render() {
    return (
      <React.Fragment>
      <input type="text" required id="artistName" value={this.state.artistName} onChange={this.handleFieldChange} />
      <Button variant="primary" >Rename/Edit Artist</Button>
      </React.Fragment>
    )
  }
}