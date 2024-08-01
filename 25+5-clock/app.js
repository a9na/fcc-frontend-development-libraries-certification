class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength : 5,
      sessionLength : 25,
      timer : 1500,
      timerLabel : "Session",
      isRunning : false,
      intervalId : '',
      timerClass : 'timer',
      timeLeftClass : '',
    };
    this.startAndStop = this.startAndStop.bind(this);
    this.reset = this.reset.bind(this);
  }
  setTimerClass(timerClass, timeLeftClass) {
    this.setState({
      timerClass : timerClass,
      timeLeftClass : timeLeftClass
    });
  }
  runInterval(time, type) {
    this.setState({
      intervalId : setInterval(() => {
        this.setState({
          timer: time,
          timerLabel: type,
          isRunning: true
        });
        time--;
        if (time < 59) {
          this.setTimerClass("timer running red", "red-time");
        } else {
          this.setTimerClass("timer running", "running-time");
        }
        if (time < 0 && type === "Session") {
          clearInterval(this.state.intervalId);
          this.audioBeep.play();
          time = this.state.breakLength * 60;
          this.runInterval(time, "Break");
        } else if (time < 0 && type === "Break") {
          clearInterval(this.state.intervalId);
          this.audioBeep.play();
          time = this.state.sessionLength * 60;
          this.runInterval(time, "Session");
        }
      }, 1000)
    });
  }
  startAndStop() {
    if (!this.state.isRunning) {
      let time;
      if (this.state.timerLabel === "Session") {
        time = (this.state.sessionLength * 60) - 1;
      } else if (this.state.timerLabel === "Break") {
        time = (this.state.breakLength * 60) - 1;
      }
      if (this.state.timer != time) {
        time = this.state.timer - 2;
      }
      this.runInterval(time, this.state.timerLabel);
    } else {
      this.setTimerClass("timer", "");
      clearInterval(this.state.intervalId);
      this.setState({
        isRunning: false
      });
    }
  }
  reset() {
    clearInterval(this.state.intervalId);
    this.setState({
      breakLength : 5,
      sessionLength : 25,
      timer: 1500,
      timerLabel: "Session",
      isRunning: false
    });
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    this.setTimerClass("timer", "");
  }
  increment(type) {
    if (this.state.isRunning === false && type === 'break' && this.state.breakLength < 60) {
      this.setState({
        breakLength : this.state.breakLength + 1,
      });
      if (this.state.timerLabel === "Break") {
        this.setState({
          timer: (this.state.breakLength + 1) * 60
        });
      }
    } else if (this.state.isRunning === false && type === 'session' && this.state.sessionLength < 60) {
      this.setState({
        sessionLength : this.state.sessionLength + 1,
      });
      if (this.state.timerLabel === "Session") {
        this.setState({
          timer: (this.state.sessionLength + 1) * 60
        });
      }
    }
  }
  decrement(type) {
    if (this.state.isRunning === false && type === 'break' && this.state.breakLength > 1) {
      this.setState({
        breakLength : this.state.breakLength - 1,
      });
      if (this.state.timerLabel === "Break") {
        this.setState({
          timer: (this.state.breakLength - 1) * 60
        });
      }
    } else if (this.state.isRunning === false && type === 'session' && this.state.sessionLength > 1) {
      this.setState({
        sessionLength : this.state.sessionLength - 1,
      });
      if (this.state.timerLabel === "Session") {
        this.setState({
          timer: (this.state.sessionLength - 1) * 60
        });
      }
    }
  }
  clockify() {
    if (this.state.timer < 0) return "00:00";
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }
  
  render() {
    return (
      <div>
        <div className="main-title">
          <div className="title-box">Timer</div>
        </div>
        <div className="length-control">
          <div id="break-label">Break Length</div>
          <Decrement id="break-decrement" decrement={this.decrement.bind(this, 'break')} />
          <div id="break-length" className="btn-level">{this.state.breakLength}</div>
          <Increment id="break-increment" increment={this.increment.bind(this, 'break')} />
        </div>
        <div className="length-control">
          <div id="session-label">Session Length</div>
          <Decrement id="session-decrement" decrement={this.decrement.bind(this, 'session')} />
          <div id="session-length" className="btn-level">{this.state.sessionLength}</div>
          <Increment id="session-increment" increment={this.increment.bind(this, 'session')} />
        </div>
        <div className={this.state.timerClass} id="timer">
          <div className="timer-wrapper">
            <div id="timer-label">{this.state.timerLabel}</div>
            <div id="time-left" className={this.state.timeLeftClass}>{this.clockify()}</div>
          </div>
        </div>
        <ActionButtons startAndStop={this.startAndStop} reset={this.reset} />
        <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    );
  }
}

const Decrement = (props) => {
  return (
    <button id={props.id} className="btn-level" onClick={props.decrement}><i className="fa-solid fa-circle-arrow-down fa-2x"></i></button>
  )
}

const Increment = (props) => {
  return (
    <button id={props.id} className="btn-level" onClick={props.increment}><i className="fa-solid fa-circle-arrow-up fa-2x"></i></button>
  )
}

const ActionButtons = (props) => {
  return (
    <div className="timer-control">
      <button id="start_stop" onClick={props.startAndStop}>
        <i className="fa fa-play fa-2x"></i>
        <i className="fa fa-pause fa-2x"></i>
      </button>
      <button id="reset" onClick={props.reset}>
        <i className="fa fa-refresh fa-2x"></i>
      </button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
