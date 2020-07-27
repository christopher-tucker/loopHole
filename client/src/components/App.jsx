import React from 'react';
const axios = require('axios');
const YouTubeLooper = require('youtube-looper');
const looper = new YouTubeLooper(document.getElementById('looperDiv'));
window.looper = looper;

const defaultUrl = 'https://www.youtube.com/watch?v=aa2C0gf4lls';
// child components
import PlaybackSpeed from './PlaybackSpeed.jsx';

/**
 * App component
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: '',
      loopStart: 0,
      loopEnd: 0,
      currentPlaybackPosition: 0,
      currentSpeed: 1,
      sessionId: '',
      speedInputTextVal: ''
    }
    this.setSpeed = this.setSpeed.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
  };

  componentDidMount() {
    let params = new URLSearchParams(window.location.search);
      let id = params.get("id")
      if (id === null) {
        id = '1234';
      };
    return axios.get('/session', )
      .then((response) => {
        console.log('response:', response);
        this.handleUrlSubmit();
      })
      .catch((err) => {
        console.log('error in cdm: ', err);
      });
  };

  saveSession() {
    const { videoUrl, sessionId } = this.state;
    const { startTime, endTime, speed } = looper;
    const sessionData = { sessionId, videoUrl, startTime, endTime, speed };
    axios.post('/session', sessionData)
      .then((response) => {
        console.log('response: ', response);
      })
      .catch((err) => {
        console.log('error from server: ', err);
      });
  };

  handleUrlChange(url) {
    const { videoUrl } = this.state;
    this.setState({ videoUrl: url });
  };

  handleUrlSubmit() {
    const { videoUrl } = this.state;
    console.log('about to load id:', videoUrl);
    looper.LoadURL(videoUrl);
  }

  setSpeed() {
    const { speedInputTextVal, currentSpeed } = this.state;
    let speedNum = parseFloat(speedInputTextVal);
    if (speedNum !== NaN) {
      this.setState({ currentSpeed: speedNum });
      looper.SetSpeed(speedNum);
    }
  };

  handleSpeedChange(value) {
    console.log('value:', value);
    this.setState({ speedInputTextVal: value });
  }

  setLoopStart() {
    looper.SetStart();
  };

  setLoopEnd() {
    looper.SetEnd();
  };

  clearLoop() {
    looper.startTime = 0;
    looper.endTime = undefined;
  };

  render() {
    const {
      videoUrl,
      loopStart,
      loopEnd,
      currentPlaybackPosition,
      speedInputVal,
      speedInputTextBox
    } = this.state;

    return (
      <div className="AppComponentDiv">
        <div className="urlInputDiv">
          <input
            type="text"
            className="urlInputTextBox"
            onChange={(event) => {
              this.handleUrlChange(event.target.value);
            }} />
          <button onClick={(event) => {
            this.handleUrlSubmit();
          }}>
            Submit YouTube Url
          </button>
        </div>
        <div>
          <button
            className="setStartTimeButton"
            onClick={() => {this.setLoopStart();}}
          >
            set start
          </button>
          <button
            className="setEndTimeButton"
            onClick={() => {this.setLoopEnd();}}
          >
            set end
          </button>
          <button
            className="clearLoopButton"
            onClick={() => {this.clearLoop();}}
          >
            clear loop
          </button>
        </div>
        <PlaybackSpeed
          handleSpeedChange={this.handleSpeedChange}
          setSpeed={this.setSpeed} />
        <button
          className="saveSessionButton"
          onClick={() => {this.saveSession()}} >save session data</button>
      </div>
    );
  };
};

export default App;