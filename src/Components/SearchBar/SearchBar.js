import React, { Component } from 'react'
import './SearchBar.css'

export class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {term: ''}
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        this.props.onSearch = this.props.term
    }

    handleTermChange(e) {
        this.setState({term: e.target.value})
    }

    render() {
        return (
            <div className="SearchBar">
                <input value={this.state.value} onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
                <button className="SearchButton">SEARCH</button>
            </div>
        )
    }
}

export default SearchBar
