import React, { Component } from 'react';
import './Search.scss';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            value: ''
        };
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log('Syötettiin notta ' + this.state.value + ' :D');
    }

    render() {
        return (
            <div className="search">
                <form className="search-form" onSubmit={this.handleSubmit}>
                    <label className="search-label">Search for the course:</label>
                    <input
                        type="text"
                        value={this.state.value}
                        placeholder="Paste course url here"
                        onChange={this.handleChange}
                        className="search-text"
                    />
                    <input
                        type="submit"
                        value="Search"
                        className="search-submit-button"
                    />
                </form>
            </div>
        );
    }
}

export default Search;
