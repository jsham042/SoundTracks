import React from 'react';

import './Playlist.css';

import TrackList from '../TrackList/TrackList.js';
import {generateSongRecommendations} from "../../util/OpenAiAPIRequest.js";
import Spotify from "../../util/Spotify.js";

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">

          <input onChange={this.handleNameChange} defaultValue={'[Name your playlist]'} />
        <TrackList tracks={this.props.playlistTracks}
                   isRemoval={true}
                   onRemove={this.props.onRemove} />
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default Playlist;