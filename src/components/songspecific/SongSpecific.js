import React, { Component } from 'react';

export default class SongSpecific extends Component {
  render() {
    const chosenSongForViewing = this.props.songs.find(song => song.id === this.props.selectedArtistForSongsList);
    return (
      <div>{chosenSongForViewing.songName}</div>
    )
  }
}