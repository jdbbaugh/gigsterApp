import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'

export default class SpecificUrlEditor extends Component {
  state = {
    editUrl: false,
    url: this.props.song.url
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  youtubeURLchange = () => {
    this.setState({editUrl: true})
    this.setState({url: this.props.song.url})
  }

  youtubeSaveUrl = () => {
    console.log("youSaved")
    let songUpdate = {
      "id" : this.props.song.id,
      userId: this.props.song.userId,
      songName: this.props.song.songName,
      genre: this.props.song.genre,
      writer: this.props.song.writer,
      progression: this.props.song.progression,
      url: this.state.url,
      "notes": this.props.song.notes,
    }
    this.props.addToJson({
    "putId" :this.props.song.id,
    "dataSet" : "songs",
    "fetchType" : "PUT",
    "dataBaseObject" : songUpdate
    });
    this.props.specificSongForSongSpecificFunc(songUpdate)
    this.setState({editUrl: false})
  }

  render() {
    return (
      <React.Fragment>
      {this.state.editUrl ? <Button onClick={this.youtubeSaveUrl} variant="danger">Save New Youtube URL</Button> : <Button variant="secondary" onClick={this.youtubeURLchange}>Change Video Link</Button>}
      {this.state.editUrl ? <input type="text" id="url" value={this.state.url} className="youtube-url-new" onChange={this.handleFieldChange}/> : null}
      </React.Fragment>
    )
  }
}