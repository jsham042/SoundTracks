import React from 'react';
import './Track.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import playlist from "../Playlist/Playlist.js";


class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      audio: new Audio(this.props.track.preview_url)
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.playPreview = this.playPreview.bind(this);
    this.pausePreview = this.pausePreview.bind(this);
  }

  addTrack(event) {
    this.props.onAdd(this.props.track);
    this.state.audio.pause();
    this.setState({playing: false});
  }

  removeTrack(event) {
    this.props.onRemove(this.props.track);
    this.state.audio.pause();
    this.setState({playing: false});
  }

  playPreview(event) {
    this.state.audio.play();
    this.setState({ playing: true });
  }

  pausePreview(event) {
    this.state.audio.pause();
    this.setState({ playing: false });
  }

  renderAction() {
    if (this.props.isRemoval) {
      return <button className="Track-action" onClick={this.removeTrack}>-</button>
    }
    return <button className="Track-action" onClick={this.addTrack}>+</button>;
  }

  render() {
    return (
        <div className="Track">
          <button className="playButton" onClick={this.state.playing ? this.pausePreview : this.playPreview}>
            {this.state.playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
          </button>

          <div className="Track-information">
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist} | {this.props.track.album}</p>
          </div>
          {this.renderAction()}
        </div>
    );
  }
}

export default Track;
