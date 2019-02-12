import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

export default class SetCard extends Component {
selectSet = () => {
  this.props.setChosenSetToState(this.props.set)
}

  render() {
    // console.log(this.props.set.artistToSongs, this.props.selectedArtistForSongsList)
    let artistSpecificSet = this.props.set.artistToSongs.find(artistToSong => artistToSong.artistId === this.props.selectedArtistForSongsList)
    if (artistSpecificSet === undefined) {
      return null
    } else {
    return (
      <Dropdown.Item as="button" onClick={this.selectSet}>{this.props.set.setName}</Dropdown.Item>
    )}
  }
}