import React, { Component } from 'react';
import ArtistNameSaveEdit from "./ArtistNameSaveEdit"
import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import "./ArtistCard.css"


export default class ArtistCard extends Component {

  userSelectedArtist = evt => {
    // console.log("Artist is:",this.props.artist.id);

    this.props.artistSelectedByUser(this.props.artist.id)
  }

  artistToDelete = evt => {

    evt.preventDefault();
    console.log("NOOOOOOOO!")
    if (window.confirm("Are you sure you want to delete this artist? You will not be able to recover them or their songs.")){
    this.props.deleteArtistFromJson(this.props.artist);}
  }

  render() {
    // let sessionUserId = Number(sessionStorage.getItem("user"));
    // console.log("ArtistCard",sessionUserId);

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
          <Card.Title>{this.props.artist.artistName}
              <p href="#" onClick={()=> this.props.speciifyArtistIdToEdit(this.props.artist.id)}
              className="edit-name">  editThisName
              </p>
            </Card.Title>
          <Link to={`/songs/${this.props.artist.id}`}>
            <Button
              variant="dark"
              onClick={this.userSelectedArtist}>
                Work Tunes
            </Button>
            <Button variant="outline-secondary" onClick={this.artistToDelete}>Delete Artist</Button>
          </Link>
        </Card.Body>
      </Card>
    )
  }
}