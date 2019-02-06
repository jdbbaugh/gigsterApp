import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default class SongCard extends Component {
  render() {
    // console.log(this.props.artistToSongs)

    if (this.props.artistToSongs.find(
      artistToSong => artistToSong.songId === this.props.song.id && artistToSong.artistId === this.props.selectedArtistForSongsList)) {
    return (
      <Card className="artist-specific-container" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{this.props.song.songName}</Card.Title>
            <Button
              variant="primary">
                Work This Song
            </Button>
        </Card.Body>
      </Card>
    )
  } else {
    return null
  }
  }
}