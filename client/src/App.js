import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './redux/rootReducer';

import './App.scss';

import Header from './components/header/Header';
import Search from './components/search/Search';
import RootRoutes from './RootRoutes';
import Footer from './components/footer/Footer';

const store = createStore(
    rootReducer, // TODO: replace with reducer
    {}, // no initially loaded state,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // TODO: change when sagas are in place
);

const App = () => (
    <Provider>
        <Router>
            <div className="app">
                <Header />
                <Search />
                <RootRoutes />
                <Footer />
            </div>
        </Router>
    </Provider>
);

export default App;
