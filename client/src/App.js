import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';

import Header from './components/header/Header';
import Search from './components/search/Search';
import RootRoutes from './RootRoutes';
import Footer from './components/footer/Footer';

const App = () => (
    <Router>
        <div className="app">
            <Header />
            <Search />
            <RootRoutes />
            <Footer />
        </div>
    </Router>
);

export default App;
