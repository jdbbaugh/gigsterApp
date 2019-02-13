import React, { Component } from 'react';
import YoutubeHolder from './YoutubeHolder'
import HeaderForSpecific from './HeaderForSpecific'
import NotesForSpecific from './NotesForSpecific'
import TitlesForSpecific from './TitlesForSpecific'
import ChordsForSpecific from './ChordsForSpecific'
import SpecificUrlEditor from './SpecificUrlEditor'




export default class SongSpecific extends Component {

  render() {
    const artist = this.props.artists.find(artist => artist.id === parseInt(this.props.match.params.artistId)) || {};
    const song = this.props.songs.find(song => song.id === parseInt(this.props.match.params.songId)) || {};

    return (
      <React.Fragment>
        <HeaderForSpecific
        artist={artist} />
        <TitlesForSpecific
        specificSongForSongSpecificFunc={this.props.specificSongForSongSpecificFunc}
        addToJson={this.props.addToJson}
        song={song} />

          <YoutubeHolder selectedArtistForSongsList={song}/>

          <SpecificUrlEditor
          addToJson={this.props.addToJson}
          specificSongForSongSpecificFunc={this.props.specificSongForSongSpecificFunc}
          song={song} />

          <ChordsForSpecific
          song={song}
          selectedArtistForSongsList={song}
          addToJson={this.props.addToJson}
          specificSongForSongSpecificFunc={this.props.specificSongForSongSpecificFunc} />

          <NotesForSpecific
          song={song}
          addToJson={this.props.addToJson}
          specificSongForSongSpecificFunc={this.props.specificSongForSongSpecificFunc} />
      </React.Fragment>
    )
  }
}