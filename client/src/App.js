import React, { Component } from 'react';
import './App.scss';

import Header from './components/header/Header';
import Search from './components/search/Search';
import MockPreview from './mockPreview/MockPreview';
import Footer from './components/footer/Footer';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <Search />
                <MockPreview />
                <Footer />
            </div>
        );
    }
}

export default App;
