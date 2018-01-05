import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        try {
            const id = this.validateInput(this.state.value);
            this.props.search(id); // set the id to state
            this.props.courseFetch(); // search with the id in store
            document.querySelector('#preview').scrollIntoView({ behavior: 'smooth' }); // animate scroll down to the results
        } catch (e) {
            console.log(e);
            this.props.searchError();
            // TODO: replace alert with a proper modal or tooltip
            window.alert('That\'s not a valid url :(\nSee "How to use?" if you need help.');
        }
    }

    validateInput = input => {
        if (isNaN(parseInt(input, 10))) {
            // when given a url (or any input not parseable-as-int)
            // try to find the id param and return it, if no id found, throw error
            try {
                const url = new URL(input);
                const id = url.searchParams.get('id');
                if (id) {
                    if(isNaN(parseInt(id, 10))) {
                        // if there is an id but it can't be parsed as int, throw error
                        throw new Error('ID invalid');
                    } else {
                        // if id is found and can be parsed as int, return it
                        return parseInt(id, 10);
                    }
                } else {
                    throw new Error('No ID found');
                }
            } catch (e) {
                throw new Error(e);
            }
        } else {
            // if input can be parsed as a number, send it as is
            return parseInt(input, 10);
        }
    }

    render() {
        return (
            <div className="search">
                <div className="call-to-action">
                    <p>Studying in University of Tampere?</p>
                    <p>Create your study calendar easily!</p>
                </div>

                <form className="search-form" onSubmit={this.handleSubmit}>
                    <label className="search-label">Search for the course:</label>
                    <input
                        type="text"
                        value={this.state.value}
                        placeholder="Paste course url here"
                        onChange={this.handleChange}
                        className="search-text"
                    />

                    <div className="search-btn-link-container">
                        <input
                            type="submit"
                            value="Search"
                            className="search-submit-button"
                            disabled={!this.state.value}
                        />

                        <Link to="/help" className="search-help-link">
                            How to use?
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default Search;
