import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

export class Playlist extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter' && event.target.value) {
      this.props.onSave();
    }
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (
      <div className='Playlist'>
        <input
          id='Playlist-name'
          defaultValue={'New Playlist'}
          onChange={this.handleNameChange}
          onKeyPress={this.handleKeyPress}
        />
        <TrackList
          tracks={this.props.playlistTracks}
          isRemoval={true}
          onRemove={this.props.onRemove}
        />
        <button onClick={this.props.onSave} className='Playlist-save'>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}

export default Playlist;
