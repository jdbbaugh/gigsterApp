// bring in artist identity and then artist list .... with artists list define what songs are attached to them
// then display those songs to SongCard

import React, { Component } from 'react';
import SongCard from "./SongCard"
import SongNewSet from "./SongNewSet"
import Setlist from '../setlist/Setlist'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"



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
  this.props.addNewSongToJson({
    "dataSet" : "songs",
    "fetchType" : "POST",
    "dataBaseObject": {
      userId: this.state.userId,
      songName: this.state.songName,
      genre: this.state.genre,
      writer: this.state.writer,
      progression: this.state.progression,
      url: this.state.url,
      notes: this.state.notes,
    }
  }).then((newSongInfo) => this.artistToSongConundrum(newSongInfo))
  .then(() => this.props.onHide)
}

artistToSongConundrum = (newSongInfo) => {
  this.props.addToJson({
    "dataSet" : "artistToSongs",
    "fetchType" : "POST",
    "dataBaseObject": {
      "songId": newSongInfo.id,
      "artistId": this.props.selectedArtistForSongsList,
      "setId": 1
    }
  })
  .then(() => {
    this.props.addToJson({
      "dataSet" : "artistToSongs",
      "fetchType" : "POST",
      "dataBaseObject": {
        "songId": newSongInfo.id,
        "artistId": this.props.selectedArtistForSongsList,
        "setId": this.props.chosenSet.id
      }
    })
  })
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
              id="songName"
              placeholder="Song Title" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Youtube Link</Form.Label>
              <Form.Control
              type="text" required
              onChange={this.handleFieldChange}
              id="url"
              placeholder="Enter Youtube URL" />
              <Form.Text className="text-muted">
                Place copy and paste the youtube URL for this song here.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Version To Go By</Form.Label>
              <Form.Control
              type="text" required
              onChange={this.handleFieldChange}
              id="writer"
              placeholder="Original Artist Or Desired Rendition"/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control
              type="text" required
              onChange={this.handleFieldChange}
              id="genre"
              placeholder="Jazz, Rock, Blues....." />
            </Form.Group>
            <Button onClick={this.props.onHide} variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide} variant="outline-dark">Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


export default class SongsList extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      modalShow: false,
      createNewSet: false,
      songAvailForSetSelection: false,
      artistIdForEditing: 0,
      chosenSet:
        {
          "id": 1,
          "setName": "All Songs"
        },
     songsForNewSet: []

    };
  }

  recieveSongsForNewSet = (songObject) => {
    this.setState({songsForNewSet: songObject})
  }


  sendToSongSpecific = (songIdForSecificity) => {
    // console.log(songIdForSecificity)
    this.props.specificSongForSongSpecificFunc(songIdForSecificity)
    // this.props.history.push("/specificsong")
  }

  setChosenSetToState = (set) => {
    console.log("state is", set)
    this.setState({chosenSet: set})
  }

  addSongToSet = () => {
    this.setState({songAvailForSetSelection: true})
  }

  saveNewSet = () => {
    console.log("saved a new set wow")
    this.setState({songAvailForSetSelection: false})
  };
  render() {
    const artist = this.props.artists.find(artist => artist.id === parseInt(this.props.match.params.artistId)) || {}
    console.log(artist)

    let modalClose = () => this.setState({ modalShow: false });
    let sessionUserId = Number(sessionStorage.getItem("user"));
    // console.log("Home",sessionUserId);

    const speciifySongIdToEdit = (artistId) => {
      console.log(this.props.match.params)
      this.setState({artistIdForEditing: artistId})
      // this will be to edit stuff in the song specific json so keep it for now
    }

    return (
      <React.Fragment>
        <Button variant="dark" onClick={() => this.setState({ modalShow: true })} size="lg" block>Add New Song</Button>
        <Link to="/home">
          <Button variant="secondary" size="lg" block>Return to All Artists</Button>
        </Link>

        <SongNewSet
        songAvailForSetSelection={this.state.songAvailForSetSelection}
        addSongToSet={this.addSongToSet}
        saveNewSet={this.saveNewSet}
        addToJson={this.props.addToJson} />

        <Setlist
        sets={this.props.sets}
        setChosenSetToState={this.setChosenSetToState}
        selectedArtistForSongsList={this.props.selectedArtistForSongsList} />

        <h2 className="setName-title">{this.state.chosenSet.setName}</h2>
        <MyVerticallyCenteredModalSongs
            show={this.state.modalShow}
            onHide={modalClose}
            songs={this.props.songs}
            addNewSongToJson={this.props.addNewSongToJson}
            addToJson={this.props.addToJson}
            selectedArtistForSongsList={this.props.selectedArtistForSongsList}
            chosenSet={this.state.chosenSet}
          />
        <section className="artists-container">
          {this.props.songs.map( song =>{
            if (song.userId === sessionUserId) {
              return <SongCard
              recieveSongsForNewSet={this.recieveSongsForNewSet}
              songAvailForSetSelection={this.state.songAvailForSetSelection}
              chosenSet={this.state.chosenSet}
              key={song.id}
              sendToSongSpecific={this.sendToSongSpecific}
              song={song}
              artists={this.props.artists}
              artistToSongs={this.props.artistToSongs}
              addToJson={this.props.addToJson}
              speciifySongIdToEdit={speciifySongIdToEdit}
              selectedArtistForSongsList={artist.id}
              deleteSongFromJson={this.props.deleteSongFromJson}
              specificSongForSongSpecificFunc={this.props.specificSongForSongSpecificFunc}
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