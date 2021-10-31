import React, { Component } from 'react';
import { SearchResults } from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar'
import './App.css';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [
                {
                    id: 1,
                    name: 'Songi Songi',
                    artist: 'Alikiba',
                    album: 'Songi',
                },
            ],
            playlistName: 'mine',
            playlistTracks: [
                {
                    id: 1,
                    name: 'Songi Songi',
                    artist: 'Alikiba',
                    album: 'Songi',
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
        if (
            this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
        ) {
            return;
        } else {
            this.state.playlistTracks.push(track);
            return this.state.playlistTracks;
        }
    }

    removeTrack(track) {
        if (
            this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
        ) {
            this.state.playlistTracks.splice(
                this.state.playlistTracks.findIndex((a) => a.id === track.id),
                1
            );
        }
        return this.state.playlistTracks;
    }

    updatePlaylistName(name) {
        this.setState({ playlistName: name });
    }

    savePlaylist(trackURIs, playlistName) {

    }

    search(term) {
        console.log(term)
    }

    render() {
        return (
            <div>
                <h1>
                    Ja<span className='highlight'>mmm</span>ing
                </h1>
                <div className='App'>
                    {/* <!-- Add a SearchBar component --> */}
                    <SearchBar />
                    <div className='App-playlist'>
                        {/* Add a SearchResults component */}
                        <SearchResults
                            searchResults={this.state.searchResults}
                            onAdd={this.state.addTrack}
                            onSearch={this.search}
                        />
                        {/* Add a Playlist component --> */}
                        <Playlist
                            Playlist={this.state.playlistName}
                            TrackList={this.state.playlistTracks}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.savePlaylist}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
