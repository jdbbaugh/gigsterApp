import React, { Component } from 'react';
import ReactPlayer from 'react-player'

export default class YoutubeHolder extends Component {
  render() {
    return (
      <div className="youtube-container">
        <ReactPlayer url={this.props.selectedArtistForSongsList.url}
            width="896px"
            height="504px"
            controls />
      </div>
    )
  }
}