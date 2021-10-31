import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

export class Playlist extends Component {

    constructor(props) {
        super(props)
        this.state = {playlist: ''}
        this.handleNameChange = this.handleNameChange.bind(this)
    }

    handleNameChange(e) {
        this.setState({ playlist: e.target.value })
        this.propson.onNameChange = e.target.value
    }

    render() {
        return (
            <div className='Playlist'>
                <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
                {/* <!-- Add a TrackList component --> */}
                <TrackList
                    tracks={this.props.TrackList}
                    onRemove={this.props.onRemove}
                    isRemoval={true} />
                <button onClick={this.props.onSave} className='Playlist-save'>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default Playlist;
