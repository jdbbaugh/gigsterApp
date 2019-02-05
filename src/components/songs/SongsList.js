// import React, { Component } from 'react';

// export default class SongsList extends Component {
//   render() {
//     let sessionUserId = Number(sessionStorage.getItem("user"));
//     console.log("SongsList",sessionUserId)
//     return (
//       <div>songs whoa</div>
//     )
//   }
// bring in artist identity and then artist list .... with artists list define what songs are attached to them
// then display those songs to SongCard

import React, { Component } from 'react';
import SongCard from "./SongCard"
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



class MyVerticallyCenteredModalSongs extends Component {
  state = {
    "userId": Number(sessionStorage.getItem("user")),
    "songName": "",
    "genre": "",
    "writer": "",
    "progression": "",
    "url": "",
    "notes": ""
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
}

addNewArtist = evt => {
  evt.preventDefault()
  // this.props.addToJson({
  //   "dataSet" : "songs",
  //   "fetchType" : "POST",
  //   "dataBaseObject": {
  //     artistName: this.state.artistName,
  //     artistImageUrl: this.state.artistImageUrl,
  //     userId: this.state.userId
  //   }
  // }).then(() => this.props.onHide)
}

  render() {

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Get this tune ready to go!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.addNewArtist}>
            <Form.Group>
              <Form.Label>Song Title</Form.Label>
              <Form.Control
              type="text" required
              onChange={this.handleFieldChange}
              id="artistImageUrl"
              placeholder="Song Title" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Youtube Link</Form.Label>
              <Form.Control
              type="text" required
              onChange={this.handleFieldChange}
              id="artistName"
              placeholder="Enter Youtube URL" />
              <Form.Text className="text-muted">
                Place copy and paste the youtube URL for this song here.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control
              type="text" required
              onChange={this.handleFieldChange}
              id="artistName"
              placeholder="Jazz, Rock, Blues....." />
            </Form.Group>
            <Button onClick={this.props.onHide} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
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
    console.log("Home",sessionUserId)

    const speciifyArtistIdToEdit = (artistId) => {
      console.log(artistId, sessionUserId)
      this.setState({artistIdForEditing: artistId})

    }

    return (
      <React.Fragment>
      <Button variant="primary" onClick={() => this.setState({ modalShow: true })} size="lg" block>Add New Song</Button>
      <MyVerticallyCenteredModalSongs
          show={this.state.modalShow}
          onHide={modalClose}
          addToJson={this.props.addToJson}
        />
      <section className="artists-container">
        {this.props.songs.map( song =>{
          if (song.userId === sessionUserId) {
            return <SongCard
            key={song.id}
            song={song}
            addToJson={this.props.addToJson}
            artistSelectedByUser={this.props.artistSelectedByUser}
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