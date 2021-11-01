import React, { Component } from 'react';
import { SearchResults } from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../utils/Spotify';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          id: 4,
          name: 'Eva',
          artist: 'Davis D',
          album: 'Afro Killer',
        },
      ],
      playlistName: 'New Playlist',
      playlistTracks: [
        {
          id: 1,
          name: 'Eva',
          artist: 'Davis D',
          album: 'Afro Killer',
        },
        {
          id: 2,
          name: 'Find you',
          artist: 'Jonas',
          album: 'Find you',
        },
      ],
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
      console.log(this.state.playlistTracks)
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
    if (tracks.length && this.state.playlistName) {
      let trackURIs = tracks.map((track) => track.uri);
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: [],
        });
      });
    }
  }

  search(term) {
    console.log(term);
    Spotify.search(term).then((result) => {
      this.setState({ searchResults: result });
      console.log('SEARCH-RES::', result);
    });
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
