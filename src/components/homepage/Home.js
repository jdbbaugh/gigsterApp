import React, { Component } from 'react';
import ArtistCard from "./ArtistCard"


export default class Home extends Component {
  render() {
    let sessionUserId = Number(sessionStorage.getItem("user"));
    console.log(sessionUserId)

    return (
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

    )
  }
}