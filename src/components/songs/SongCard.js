import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default class SongCard extends Component {
  render() {
    console.log(this.props.artistToSongs.find(artistToSong => artistToSong.songId === 4))
    // console.log(matchArtistToTable)

    let isSpecifiedArtistsSong = false


    return (
      <Card className="artist-specific-container" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{this.props.song.songName}
            <a className="edit-name">  editThisSong</a>
            </Card.Title>
            <Button
              variant="primary">
                Work This Song
            </Button>
        </Card.Body>
      </Card>
    )
  }
}