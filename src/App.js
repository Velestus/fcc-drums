import React, { Component } from 'react';
import './App.css';
import Audio from './components/audio/Audio.js';
import { bankOne, bankTwo } from './banks';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      data: bankOne,
      dataId: "Heater Sound Kit",
      display: String.fromCharCode(160)
    }
    this.displayClipName = this.displayClipName.bind(this);
    this.powerControl = this.powerControl.bind(this);
    this.selectSoundKit = this.selectSoundKit.bind(this);
  }
  displayClipName(name) {
    if (this.state.power) {
      this.setState({
        display: name
      });
    }
  }
  powerControl() {
    this.setState({
      power: !this.state.power,
      display: String.fromCharCode(160)
    });
  }
  selectSoundKit() {
    if (this.state.power) {
      this.state.dataId === 'Heater Kit' ?
        this.setState({
          data: bankTwo,
          display: 'Smooth Piano Kit',
          dataId: 'Smooth Piano Kit',
        }) :
        this.setState({
          data: bankOne,
          display: 'Heater Kit',
          dataId: 'Heater Kit',
        });
    }
  }
  render() {
    const powerController = this.state.power ? { float: 'right' } : { float: 'left' };
    const bankController = this.state.data === bankTwo ? { float: 'right' } : { float: 'left' };
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Drum Machine</h1>
        </header>
        <div id="drum-machine">
          <div className="key-wrapper">
            {this.state.data.map((item) => <Audio data={item} updateDisplay={this.displayClipName} power={this.state.power}/>)}
          </div>
          <div className="control-wrapper">
            <div className="control">
              <p>Power</p>
              <div className="select">
                <div onClick={this.powerControl} style={powerController} className="inner" />
              </div>
            </div>
            <p id="display">{this.state.display}</p>
            <div className="control">
              <p>Sound Kit</p>
              <div className="select">
                <div onClick={this.selectSoundKit} style={bankController} className="inner" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
