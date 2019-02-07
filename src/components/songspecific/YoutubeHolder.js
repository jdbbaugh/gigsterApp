import React, { Component } from 'react';
import ReactPlayer from 'react-player'

export default class YoutubeHolder extends Component {
  render() {
    return (
      <ReactPlayer url={this.props.selectedArtistForSongsList.url}
          controls />
    )
  }
}