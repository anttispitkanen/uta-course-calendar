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
    if (!this.state.course) {
      return <div>Fetching...</div>;
    }

    // console.log(this.state.course._opsi_opryhmat)
    const opetus = this.state.course._opsi_opryhmat.find(a => a.id_opsi_opetus == 1);
    console.log(opetus.ajat[0])
    const jee = opetus.ajat[0];

    const alkuaika = new Date(jee.alkuaika);
    alkuaika.setHours(jee.alkutunnit);
    const loppuaika = new Date(jee.alkuaika);
    loppuaika.setHours(jee.lopputunnit);

    return (
      <div className="App">
        <ul className="App-intro">
          <li>Id: {this.state.course.id}</li>
          <li>Course name: {this.state.course.name}</li>
          <li>Alkaa: {alkuaika.toString()}</li>
          <li>Loppuu: {loppuaika.toString()}</li>
          <li>Paikka: {jee.paikka}</li>
        </ul>
      </div>
    );
  }
}

export default App;
