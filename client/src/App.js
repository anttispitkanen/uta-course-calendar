import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

import Header from './components/header/Header';
import MockPreview from './mockPreview/MockPreview';
import Footer from './components/footer/Footer';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <MockPreview />
                <Footer />
            </div>
        );
    }
}

export default App;
