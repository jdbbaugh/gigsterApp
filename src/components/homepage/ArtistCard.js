import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import "./ArtistCard.css"


export default class ArtistCard extends Component {
  render() {
    return (

  <Card className="artist-specific-container" style={{ width: '18rem' }}>
    <Card.Img variant="top" src={this.props.artist.artistImageUrl} />
    <Card.Body>
      <Card.Title>{this.props.artist.artistName}<a className="edit-name">  editThisName</a></Card.Title>
      <Button variant="primary" >Work Tunes</Button>
    </Card.Body>
  </Card>
    )
  }
}