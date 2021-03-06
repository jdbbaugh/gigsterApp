import React, { Component } from 'react';
import ArtistCard from "./ArtistCard"
import { Link } from "react-router-dom"
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



class MyVerticallyCenteredModalArtists extends Component {
  state = {
    "userId": Number(sessionStorage.getItem("user")),
    "artistName": "",
    "artistImageUrl": ""
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
}

addNewArtist = evt => {
  evt.preventDefault()
  this.props.addToJson({
    "dataSet" : "artists",
    "fetchType" : "POST",
    "dataBaseObject": {
      artistName: this.state.artistName,
      artistImageUrl: this.state.artistImageUrl,
      userId: this.state.userId
    }
  }).then(() => this.props.onHide)
}

  render() {

    return (
      <Modal
        {...this.props}
        className="newArtist-modal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Time For Some New Jams!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.addNewArtist}>
            <Form.Group>
              <Form.Label>Artist Image</Form.Label>
              <Form.Control
              type="text" required
              onChange={this.handleFieldChange}
              id="artistImageUrl"
              placeholder="Artist Image URL" />
              <Form.Text className="text-muted">
                Google your artist and link an image of them here.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Artist Name</Form.Label>
              <Form.Control
              type="text" required
              onChange={this.handleFieldChange}
              id="artistName"
              placeholder="Enter Artist Name" />
            </Form.Group>
            <Button onClick={this.props.onHide} variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


export default class Home extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      modalShow: false,
      artistIdForEditing: 0
    };
  }
  render() {
    let modalClose = () => this.setState({ modalShow: false });
    let sessionUserId = Number(sessionStorage.getItem("user"));
    // console.log("Home",sessionUserId);

    const speciifyArtistIdToEdit = (artistId) => {
      // console.log(artistId, sessionUserId);
      this.setState({artistIdForEditing: artistId})

    }

    return (
      <React.Fragment>
      <Button variant="dark" onClick={() => this.setState({ modalShow: true })} size="lg" block>Add New Artist</Button>
      <Link to="/">
      <Button variant="secondary" size="lg" block>LogOut</Button>
      </Link>
      <MyVerticallyCenteredModalArtists
          show={this.state.modalShow}
          onHide={modalClose}
          addToJson={this.props.addToJson}
        />
      <section className="artists-container">
        {this.props.artists.map( artist =>{
          if (artist.userId === sessionUserId) {
            return <ArtistCard
            key={artist.id}
            artist={artist}
            speciifyArtistIdToEdit={speciifyArtistIdToEdit}
            artistIdForEditing={this.state.artistIdForEditing}
            addToJson={this.props.addToJson}
            artistSelectedByUser={this.props.artistSelectedByUser}
            deleteArtistFromJson={this.props.deleteArtistFromJson}
            />
            } else {
              return null
            }
        })}
        </section>
        </React.Fragment>

    )
  }
}