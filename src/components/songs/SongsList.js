import React, { Component } from 'react';

export default class SongsList extends Component {
  render() {
    let sessionUserId = Number(sessionStorage.getItem("user"));
    console.log("SongsList",sessionUserId)
    return (
      <div>songs whoa</div>
    )
  }
}