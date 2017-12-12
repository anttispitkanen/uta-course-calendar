import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      course: null
    };
  }

  async componentDidMount() {
    const response = await fetch('/course?id=36903');
    const resJSON = await response.json();
    this.setState({ course: resJSON });
    console.log(resJSON);
  }
  render() {
    return (
      <div className="App">
        <ul className="App-intro">
          <li>Id: {this.state.course ? this.state.course.id : 'loading...'}</li>
          <li>Course name: {this.state.course ? this.state.course.name : 'loading...'}</li>
        </ul>
      </div>
    );
  }
}

export default App;
