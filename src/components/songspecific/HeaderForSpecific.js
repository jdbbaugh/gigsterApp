import React, { Component } from 'react';
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'

export default class HeaderForSpecific extends Component {


  render() {
    return (
      <React.Fragment>
        <Link to="/home">
          <Button variant="secondary" size="lg">Return to All Artists</Button>
        </Link>
        <Link to={`/songs/${this.props.artist.id}/set/${Number(1)}`}>
          <Button variant="outline-dark" size="lg">Return to Artist Library</Button>
        </Link>
        </React.Fragment>
    )
  }
}