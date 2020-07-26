import React from 'react';
const YouTubeLooper = require('youtube-looper');
const looper = new YouTubeLooper(document.getElementById('looperDiv'));
window.looper = looper;

// child components
import PlaybackSpeed from './PlaybackSpeed.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: '',
      loopStart: 0,
      loopEnd: 0,
      currentPlaybackPosition: 0,
      speedInputTextVal: '',
      currentSpeed: 1
    }
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
  };

  componentDidMount() {
    this.handleUrlSubmit();
  };

  handleUrlChange(id) {
    console.log('id:', id);
    const { videoUrl } = this.state;
    this.setState({ videoUrl: id });
  };

  handleUrlSubmit() {
    const { videoUrl } = this.state;
    console.log('about to load id:', videoUrl);
    looper.LoadURL(videoUrl);
  }

  // first thing to work on
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
            Submit YouTube ID
          </button>
        </div>
        <PlaybackSpeed
          handleSpeedChange={this.handleSpeedChange}
          setSpeed={this.setSpeed} />
      </div>
    );
  };
};

export default App;