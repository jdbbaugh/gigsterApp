import React, { Component } from 'react';
import ArtistCard from "./ArtistCard"
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



class MyVerticallyCenteredModal extends Component {
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
            Time For Some New Jams!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Artist Image</Form.Label>
    <Form.Control type="text" placeholder="Artist Image URL" />
    <Form.Text className="text-muted">
      Google your artist and link an image of them here.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Artist Name</Form.Label>
    <Form.Control type="test" placeholder="Enter Artist Name" />
  </Form.Group>
  <Button variant="primary" type="button">
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
    console.log(...args)

    this.state = { modalShow: false };
  }
  render() {
    let modalClose = () => this.setState({ modalShow: false });
    let sessionUserId = Number(sessionStorage.getItem("user"));
    console.log("Home",sessionUserId)

    return (
      <React.Fragment>
      <Button variant="primary" onClick={() => this.setState({ modalShow: true })} size="lg" block>Add New Artist</Button>
      <MyVerticallyCenteredModal
          show={this.state.modalShow}
          onHide={modalClose}
        />
      <section className="artists-container">
        {this.props.artists.map( artist =>{
          if (artist.userId === sessionUserId) {
            return <ArtistCard
            key={artist.id}
            artist={artist} />
            } else {
              return null
            }
        })}
        </section>
        </React.Fragment>

    )
  }
}