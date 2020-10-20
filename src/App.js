import React from "react";
import './App.scss'

const audioBank = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 50,
      audio: audioBank,
      currentSound: "",
    };
    this.soundPlay = this.soundPlay.bind(this);
    this.RenderButton = this.RenderButton.bind(this);
    this.checkKeyPress = this.checkKeyPress.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
  }
  handleVolumeChange = (e) => {
    const volume = e.target.value;
    this.setState(() => ({
      volume,
    }));
  };
  checkKeyPress = (key) => {
    this.state.audio.map((audioObj) => {
      if (key.keyCode == audioObj.keyCode) {
        this.soundPlay(audioObj.keyTrigger, audioObj.id);
      }
    });
  };
  soundPlay = (keyTriger, id) => {
    this.setState(() => ({
      currentSound: id,
    }));
    setTimeout(() => {
      this.setState(() => ({
        currentSound: "",
      }));
    }, 1500);
    let sound = document.getElementById(keyTriger);
    sound.volume=this.state.volume/100;
    sound.play();
  };
  RenderButton = () => {
    return this.state.audio.map((soundObj, index) => {
      return (
        <button
          id={soundObj.id}
          className="drum-pad"
          key={index}
          onClick={() => {
            this.soundPlay(soundObj.keyTrigger, soundObj.id);
          }}
        >
          <audio
            className="clip"
            id={soundObj.keyTrigger}
            src={soundObj.url}
            type="audio/mpeg"
          ></audio>
          {soundObj.keyTrigger}
        </button>
      );
    });
  };
  render() {
    document.addEventListener("keydown", this.checkKeyPress, false);
    return (
      <div className="flex col container">
        <div id="title">FCC Drum Machine</div>
        <div id="drum-machine" className="flex">
          <div id="display" className="flex">
            {this.state.currentSound}
          </div>
          <div>
            <div id="volume">Volume:{this.state.volume}</div>
            <input
              type="range"
              min="0"
              max="100"
              value={this.state.volume}
              id="myNumber"
              onChange={this.handleVolumeChange}
            ></input>
          </div>
          <div className="drum-container">
            <this.RenderButton />
          </div>
        </div>
        <div id="made-by">Made-By: Khush Ramdev</div>
      </div>
    );
  }
}

export default DrumMachine
