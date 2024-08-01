import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'
const mapKeys = {
  81 : 'Q',
  87 : 'W',
  69 : 'E',
  65 : 'A',
  83 : 'S',
  68 : 'D',
  90 : 'Z',
  88 : 'X',
  67 : 'C'
};

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      volume: 0.5
    };
    this.handlePlay = this.handlePlay.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onVolumeChange = this.onVolumeChange.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
  }
 componentWillUnmount() {
   document.removeEventListener("keydown", this.handleKeyPress)
 }
  handlePlay(id, audName) {
    document.getElementById(id).volume = this.state.volume;
    document.getElementById(id).play();
    this.setState({name: audName})
    console.log("clicked")
  }
  handleKeyPress(event) {
    let key = mapKeys[event.keyCode];
if(key) {document.getElementById(key).volume = this.state.volume;}
    key && document.getElementById(key).play();
  }
  onVolumeChange(event) {
      this.setState({
        volume: event.target.value / 100
      });
    }
  render() {
    return (
      <section className="main">
      <div id="drum-machine">
        <div className="pads-div">
          <div 
            className="drum-pad"
            id="heater-1"
            onClick={()=>this.handlePlay("Q", "Heater 1")}
            //onKeyDown={ this.handleKeyPress}
            >Q
            <audio 
              id= "Q"
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" 
            className="clip"
              >audio</audio>
         </div>
          <div 
            className="drum-pad"
            id="heater-2"
            onClick={()=>this.handlePlay("W", "Heater 2")}
            >W
            <audio 
              id="W"
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" 
              className="clip"
              >audio</audio>
          </div>
          <div 
            className="drum-pad"
            id="heater-3"
            onClick={()=>this.handlePlay("E", "Heater 3")}
            >E
            <audio 
              id="E" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" 
            className="clip"
              >audio</audio>
          </div>
          <div 
            className="drum-pad"
            id="heater-4"
            onClick={()=>this.handlePlay("A", "Heater 4")}
            >A
            <audio 
              id="A" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" 
            className="clip"
              >audio</audio>
          </div>
          <div 
            className="drum-pad"
            id="clap"
            onClick={()=>this.handlePlay("S", "Clap")}
            >S
            <audio 
              id="S" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" 
            className="clip"
              >audio</audio>
          </div>
          <div 
            className="drum-pad" 
            id="open-hh"
            onClick={()=>this.handlePlay("D", "Open HH")}
            >D
            <audio 
              id="D" src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" 
            className="clip"
              >audio</audio>
          </div>
          <div 
            className="drum-pad"
            id="kick-n'-hat"
            onClick={()=>this.handlePlay("Z", "Kick n' Hat")}
            >Z
            <audio 
              id="Z" src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" 
            className="clip"
              >audio</audio>
          </div>
          <div 
            className="drum-pad"
            id="kick"
            onClick={()=>this.handlePlay("X", "Kick")}
            >X
            <audio 
              id="X" src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" 
            className="clip"
              >audio</audio>
          </div>
          <div className="drum-pad"
            id="closed-hh"
            onClick={()=>this.handlePlay("C", "Closed HH")}
            >C
            <audio 
              id="C" src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" 
            className="clip"
              >audio</audio>
          </div>
        </div>
        <div className="display-div">
        <div id="display">
          <h4>{this.state.name}</h4>
        </div>
          <label for="volume">
          <input id="volume" type="range" onChange={this.onVolumeChange}/>
           &nbsp; Volume
          </label>
          <p></p>
        </div>
      </div>
      </section>
    )
  }
}

ReactDOM.render(<DrumMachine />, document.getElementById("root"))
