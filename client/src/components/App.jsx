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
      videoUrl: 'https://www.youtube.com/watch?v=aa2C0gf4lls',
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
    const { videoUrl } = this.state;
    looper.LoadURL(videoUrl);
  };

  setVideoUrl(videoUrl) {
    this.setState({ videoUrl });
  };

  // first thing to work on
  setSpeed() {
    const { speedInputTextVal, currentSpeed } = this.state;
    let speedNum = parseFloat(speedInputTextVal);
    console.log('speedNum:', speedNum);
    if (speedNum !== NaN) {
      this.setState({ currentSpeed: speedNum });
      console.log('currentSpeed:', currentSpeed);
      looper.SetSpeed(currentSpeed);
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
        <PlaybackSpeed
          handleSpeedChange={this.handleSpeedChange}
          setSpeed={this.setSpeed} />
      </div>
    );
  };
};

export default App;