import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from "react-router-dom"

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
      <Link to={`/songs/${artistSpecificSet.artistId}/set/${this.props.set.id}`}>
      <Dropdown.Item as="button" onClick={this.selectSet}>{this.props.set.setName}</Dropdown.Item>
      </Link>
    )}
  }
}