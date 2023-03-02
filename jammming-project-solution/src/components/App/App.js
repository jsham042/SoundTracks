import React from 'react';
import './App.css';

import Playlist from '../Playlist/Playlist.js';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Spotify from '../../util/Spotify.js';
import {generateSongRecommendations} from "../../util/OpenAiAPIRequest.js";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],


    };

    this.search = this.search.bind(this);
    this.openAiSearch = this.openAiSearch.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);

  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }


  openAiSearch(prompt){
    generateSongRecommendations(`Give me 20 song recommendations for this prompt: ${prompt}. Format the response with this convention Song Name - Artist Name 2. Song Name - Artist Name`)
        .then((response) => {
          const songList = response.slice(0, 20); // Get the first 20 song recommendations
          const promises = songList.map(song => Spotify.openAiSearch(song)); // Create an array of promises for each song search
          Promise.all(promises) // Wait for all promises to resolve
              .then((searchResultsArray) => {
                const searchResults = [].concat(...searchResultsArray); // Concatenate all search results into a single array
                this.setState({searchResults: searchResults});
              })
              .catch((error) => {
                console.error(error);
              });
        })
        .catch((error) => {
          console.error(error);
        });
  }

  // generatePlaylistName(prompt) {
  //   generatePlaylistName(`Come up with a playlist name for playlist with the following vibe: ${prompt} make it less than 50 characters`).then(playListName => {
  //     this.setState({playListName: playListName});
  //   });
  // }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: '[NAME PLAYLIST]',
        playlistTracks: []
      });
    });
  }



  render() {
    return (
        <div>
          <h1>SOUND <span className="highlight">TRACK</span></h1>
          <div className="App">
            <SearchBar onSearch={this.openAiSearch} />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults}
                             onAdd={this.addTrack} />
              <Playlist playlistName={this.state.playlistName}
                        playlistTracks={this.state.playlistTracks}
                        onNameChange={this.updatePlaylistName}
                        onRemove={this.removeTrack}
                        onSave={this.savePlaylist} />
            </div>
          </div>
        </div>
    );
  }

}



export default App;
