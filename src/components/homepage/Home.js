import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    let sessionUserId = Number(sessionStorage.getItem("user"));
    console.log(sessionUserId)

    return (
      <section className="artists-container">
        {this.props.artists.map( artist =>{
          if (artist.userId === sessionUserId) {
            return <div key={artist.id}>{artist.artistName}</div>
            } else {
              return null
            }
        })}
        </section>

    )
  }
}