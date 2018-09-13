import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './redux/rootReducer';
import appSaga from './redux/rootSagas';

import './App.scss';

import Header from './components/header/Header';
import Search from './components/search';
import RootRoutes from './RootRoutes';
import Footer from './components/footer/Footer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  {}, // no initially loaded state,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(appSaga);

const App = () => (
  <Provider store={store}>
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
