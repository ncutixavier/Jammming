import React, { Component } from 'react';
import { SearchResults } from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import Deezer from '../../utils/Deezer';
import './App.css';

let api;
if (process.env.NODE_ENV === 'development') {
  api = 'http://localhost:8005/api/v1/deezer';
} else {
  api = 'https://leave-app-sys.herokuapp.com/api/v1/deezer';
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (!tracks.find((trackIndex) => trackIndex.id === track.id)) {
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let newTracks = tracks.filter((trackIndex) => trackIndex.id !== track.id);
    this.setState({ playlistTracks: newTracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    let tracks = this.state.playlistTracks;
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
    if (tracks.length && this.state.playlistName && token && user_id) {
      let trackIDs = tracks.map((track) => track.id);
      Deezer.savePlaylist(
        this.state.playlistName,
        trackIDs,
        token,
        user_id
      ).then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: [],
        });
        document.getElementById('Playlist-name').value =
          this.state.playlistName;
      });
    }
  }

  search(term) {
    Deezer.search(term).then((result) => {
      this.setState({ searchResults: result });
    });
  }

  componentDidMount() {
    const newAccessToken = window.location.href.match(/token=([^&]*)/);
    if (newAccessToken) {
      localStorage.setItem('token', newAccessToken[1]);
      fetch(`${api}/profile?token=${newAccessToken[1]}`)
        .then((response) => response.json())
        .then((json) => {
          localStorage.setItem('user_id', json.id);
        });
    } else {
      let url = `${api}/auth`;
      window.location.href = url;
    }
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className='highlight'>mmm</span>ing
        </h1>
        <div className='App'>
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar onSearch={this.search} />
          <div className='App-playlist'>
            {/* Add a SearchResults component */}
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              onSearch={this.search}
            />
            {/* Add a Playlist component --> */}
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
