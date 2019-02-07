import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"
import ReactPlayer from 'react-player'

export default class SongSpecific extends Component {
  render() {

    return (
      <div>
      <Link to="/home">
      <Button variant="secondary" size="lg" block>Return to Artist Display</Button>
      </Link>
        <h2>{this.props.selectedArtistForSongsList.songName}</h2>
        <p>{this.props.selectedArtistForSongsList.writer}<br></br>-{this.props.selectedArtistForSongsList.genre}</p>
        <ReactPlayer url={this.props.selectedArtistForSongsList.url}
            controls />
      <section>
        <h3>Notes:<a className="edit-name">   editNotes</a></h3>
        <p>{this.props.selectedArtistForSongsList.notes}</p>
      </section>

        </div>
    )
  }
}