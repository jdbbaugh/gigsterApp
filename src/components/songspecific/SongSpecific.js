import React, { Component } from 'react';

export default class SongSpecific extends Component {
  render() {
    return (
      <div>{this.props.selectedArtistForSongsList}</div>
    )
  }
}