import React from 'react';
import albumArt from './DALL·E 2023-03-01 20.07.50 - driving down the 101 with the top down.png';
import './Playlist.css';

import TrackList from '../TrackList/TrackList.js';
import {generateImage} from "../../util/OpenAiAPIRequest.js";

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
          <h2>Your Playlist</h2>
          {/*<img src={albumArt} width="200" alt="AI Generated Image" />*/}
          <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
          <input onChange={this.handleNameChange} placeholder={'Name your playlist'} />
        <TrackList tracks={this.props.playlistTracks}
                   isRemoval={true}
                   onRemove={this.props.onRemove} />

      </div>
    );
  }
}

export default Playlist;