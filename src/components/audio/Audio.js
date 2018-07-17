import React, { Component } from 'react';
import './Audio.css';

const activeStyle = {
  backgroundColor: 'orange',
  height: 97,
  boxShadow: "0 3px orange",
  marginTop: 13
}

const inactiveStyle = {
  backgroundColor: 'hsl(120, 50%, 40%)',
  marginTop: 10,
  boxShadow: "3px 3px 5px black"
}

class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle
    }
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.data.keyCode) {
      this.playSound();
    }
  }
  activatePad() {
    if (this.props.power) {
      this.state.padStyle.backgroundColor === 'orange' ?
        this.setState({
          padStyle: inactiveStyle
        }) :
        this.setState({
          padStyle: activeStyle
        });
    } else {
      this.state.padStyle.marginTop === 13 ?
        this.setState({
          padStyle: inactiveStyle
        }) :
        this.setState({
          padStyle: {
            marginTop: 13,
            height: 97,
            backgroundColor: 'grey',
            boxShadow: "0 3px grey"
          }
        });
    }
  }
  playSound(e) {
    const sound = document.getElementById(this.props.data.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
    this.props.updateDisplay(this.props.data.id.replace(/-/g, ' '));
  }
  
  render() {
    return (
      <div className="drum-pad" id={this.props.data.id} style={this.state.padStyle} onClick={this.playSound}>
        <audio className="clip" src={this.props.data.url} 
          id={this.props.data.keyTrigger}></audio>
        {this.props.data.keyTrigger}
      </div>
    );
  }
}

export default Audio;