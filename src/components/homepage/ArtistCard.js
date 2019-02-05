import React, { Component } from 'react';
import ArtistNameSaveEdit from "./ArtistNameSaveEdit"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import "./ArtistCard.css"


export default class ArtistCard extends Component {

  render() {
    let sessionUserId = Number(sessionStorage.getItem("user"));
    console.log("ArtistCard",sessionUserId)

        if (this.props.artistIdForEditing === this.props.artist.id) {
      return(

  <Card className="artist-specific-container" style={{ width: '18rem' }}>
    <Card.Img variant="top" src={this.props.artist.artistImageUrl} />
    <Card.Body>
      <ArtistNameSaveEdit
      artist={this.props.artist}
      speciifyArtistIdToEdit={this.props.speciifyArtistIdToEdit}
      addToJson={this.props.addToJson}
      />
    </Card.Body>
  </Card>
      )
        }
    return (

  <Card className="artist-specific-container" style={{ width: '18rem' }}>
    <Card.Img variant="top" src={this.props.artist.artistImageUrl} />
    <Card.Body>
      <Card.Title>{this.props.artist.artistName}<a onClick={()=> this.props.speciifyArtistIdToEdit(this.props.artist.id)}
        className="edit-name">  editThisName</a></Card.Title>
      <Button variant="primary" >Work Tunes</Button>
    </Card.Body>
  </Card>
    )
  }
}