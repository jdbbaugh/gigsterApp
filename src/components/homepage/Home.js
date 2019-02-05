import React, { Component } from 'react';
import ArtistCard from "./ArtistCard"
import Button from 'react-bootstrap/Button'


export default class Home extends Component {
  render() {
    let sessionUserId = Number(sessionStorage.getItem("user"));
    console.log(sessionUserId)

    return (
      <React.Fragment>
      <Button variant="primary" size="lg" block>Add New Artist</Button>
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