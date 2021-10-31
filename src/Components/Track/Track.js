import React, { Component } from 'react'
import "./Track.css"

export class Track extends Component {

    constructor(props) {
        super(props)
        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
    }

    renderAction(isRemoval) {
        let html
        if(isRemoval) {
            html = <button onClick={this.addTrack} className="Track-action">-</button>
        } else if (!isRemoval) {
            html = <button onClick={this.removeTrack} className="Track-action">+</button>
        }
        return html
    }

    addTrack() {
        //add track
        return this.props.onAdd(this.props.track)
    }

    removeTrack() {
        return this.props.onRemove(this.props.track)
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3> {this.props.track.name} </h3>
                    <p> {this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction(this.props.isRemoval)}
            </div>
        )
    }
}

export default Track
