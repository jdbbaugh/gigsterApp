import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"
import ReactPlayer from 'react-player'

export default class SongSpecific extends Component {
  render() {
    const chosenSongForViewing = this.props.songs.find(song => song.id === this.props.selectedArtistForSongsList);
    return (
      <div>
      <Link to="/home">
      <Button variant="secondary" size="lg" block>Return to Artist Display</Button>
      </Link>
        <h2>{chosenSongForViewing.songName}</h2>
        <p>{chosenSongForViewing.writer}<br></br>-{chosenSongForViewing.genre}</p>
        <ReactPlayer url={chosenSongForViewing.url}
            playing
            controls />

        </div>
    )
  }
}