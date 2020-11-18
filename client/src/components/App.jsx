import React, { useState } from 'react';
const axios = require('axios');
const YouTubeLooper = require('../../../youtube-looper/YoutubeLooper.js');
const looper = new YouTubeLooper(document.getElementById('looperDiv'));
// window.looper = looper;

// const defaultUrl = 'https://www.youtube.com/watch?v=aa2C0gf4lls';
// child components
import PlaybackSpeed from './PlaybackSpeed.jsx';
import SessionData from './SessionData.jsx';
import LoopControls from './LoopControls.jsx';
import QuickKeysModal from './QuickKeysModal.jsx';

/**
 * App component
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: '',
      startTime: 0,
      endTime: 0,
      currentPlaybackPosition: 0,
      speed: 1.0,
      sessionId: '',
      speedInputTextVal: '',
      showModal: false
    };
    this.setSpeed = this.setSpeed.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.setLoopStart = this.setLoopStart.bind(this);
    this.nudgeLoopStartLeft = this.nudgeLoopStart.bind(this);
    this.nudgeLoopEnd = this.nudgeLoopEnd.bind(this);
    this.hearTransition = this.hearTransition.bind(this);
  };

  componentDidMount() {};

  saveSession() {
    const { videoUrl, sessionId } = this.state;
    const { startTime, endTime, speed } = looper;
    if (sessionId === '') {
      var sessionData = { videoUrl, startTime, endTime, speed };
      axios.post('/session', sessionData)
        .then((response) => {
          console.log('response from server: ', response);
          const { sessionId, speed, startTime, endTime, videoUrl } = response.data;
          this.setState({ sessionId, speed, startTime, endTime, videoUrl });
        })
        .catch((err) => {
          console.log('server error: ', err);
        });
    } else {
      let sessionData = { sessionId, videoUrl, startTime, endTime, speed };
      axios.put('/session', sessionData)
        .then((response) => {
          console.log('response from server: ', response);
          const { sessionId, speed, startTime, endTime, videoUrl } = response.data;
          this.setState({ sessionId, speed, startTime, endTime, videoUrl });
        })
        .catch((err) => {
          console.log('server error: ', err);
        });
    }
  };

  handleUrlChange(url) {
    const { videoUrl } = this.state;
    this.setState({ videoUrl: url });
  };

  handleUrlSubmit() {
    const { videoUrl } = this.state;
    looper.LoadURL(videoUrl);
  };

  handleSessionIdChange(value) {
    const { sessionId } = this.state;
    this.setState({ sessionId: value });
  };

  handleSessionIdSubmit() {
    const { sessionId } = this.state;
    console.log('about to submit sessionId to server:', sessionId);
    return axios.get(`/session/${sessionId}`)
      .then((response) => {
        const { endTime, sessionId, speed, startTime, videoUrl } = response.data;
        this.setState({ endTime, sessionId, speed, startTime, videoUrl });
        looper.SetLoopParams(videoUrl, startTime, endTime, speed);
      })
      .catch((err) => {
        console.log('error in get request: ', err);
      });
  };

  setSpeed() {
    const { speedInputTextVal, currentSpeed } = this.state;
    let speedNum = parseFloat(speedInputTextVal);
    if (speedNum !== NaN) {
      this.setState({ currentSpeed: speedNum });
      looper.SetSpeed(speedNum);
    }
  };

  handleSpeedChange(value) {
    this.setState({ speedInputTextVal: value });
  };

  nudgeLoopStart(nudgeAmount) {
    looper.NudgeLoopStart(nudgeAmount);
  };

  hearTransition() {
    looper.HearTransition();
  };

  nudgeLoopEnd(nudgeAmount) {
    looper.NudgeLoopEnd(nudgeAmount);
  };

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

  deleteSession() {
    const { sessionId } = this.state;
    return axios.delete(`/session/${sessionId}`)
      .then((response) => {
        console.log('response in deleteSession(): ', response);
        this.setState({ sessionId: '' })
      })
      .catch((err) => {
        console.log('error in deleteSession(): ', err);
      });
  };

  render() {
    console.log('this.state:', this.state);
    const {
      sessionId,
      videoUrl,
      startTime,
      endTime,
      currentPlaybackPosition,
      speed,
      speedInputTextBox,
      showModal
    } = this.state;

    return (
      <div className="AppComponentDiv">
        <h2>get started</h2>
        <div className="urlInputDiv">
          <input
            type="text"
            className="urlInputTextBox"
            onChange={(event) => {
              this.handleUrlChange(event.target.value);
            }} />
          <button
            onClick={(event) => {
              this.handleUrlSubmit();
            }}>
            Submit YouTube Url
          </button>
        </div>
        <div className="sessionIdInputDiv">
          <input
            type="text"
            className="sessionIdInputTextBox"
            onChange={(event) => {
              this.handleSessionIdChange(event.target.value);
            }} />
          <button onClick={(event) => {
            this.handleSessionIdSubmit();}} >
            Submit Session Id
          </button>
        </div>
        <h2>
          loop controls
        </h2>
        <div>
          <LoopControls
            setLoopStart={this.setLoopStart}
            setLoopEnd={this.setLoopEnd}
            clearLoop={this.clearLoop}
            nudgeLoopStart={this.nudgeLoopStart}
            nudgeLoopEnd={this.nudgeLoopEnd}
            hearTransition={this.hearTransition} />
          <PlaybackSpeed
            handleSpeedChange={this.handleSpeedChange}
            setSpeed={this.setSpeed} />
        </div>
        <h2>
          manage session
        </h2>
        <button
          className="saveSessionButton"
          onClick={() => {this.saveSession();}} >
          save session
        </button>
        <button
          className="deleteLoopButton"
          onClick={() => {this.deleteSession();}} >
          delete session
        </button>
        <SessionData
          sessionId={sessionId}
          videoUrl={videoUrl}
          startTime={startTime}
          endTime={endTime}
          speed={speed} />
        {/* <QuickKeysModal /> */}
        <div>
            _______________________________________________________________________________
        </div>
        <div style={{fontWeight: 'bold'}}>
          <div style={{fontSize: 'larger'}}>
            INSTRUCTIONS:
          </div>
          <div>
            1. find a music youtube tutorial that you want to use to practice
          </div>
          <div>
            2. copy the url of the youtube page and paste it into the 'Submit YouTube URL' box and hit submit
          </div>
          <div>
            3. as the video plays, click the 'set start' button at the moment you want to start your loop
          </div>
          <div>
            4. click the 'set end' button at the moment you want to end your loop
          </div>
          <div>
            5. enter desired speed of playback, sometimes it is better to practice at slower speeds (for 60% speed, enter 0.6 into the box, etc.)
          </div>
          <div>
            6. you can slightly nudge the start and end of your playback loop using the 'nudge loop start' and 'nudge loop end' buttons
          </div>
          <div>
            NOTE: if you let your loop cycle a few times, it will automatically adjust it's accuracty, so it's best to listen to the transition at least 2 or 3 times to know if you want to adjust it
          </div>
          <div>
            7. at any time, you can click 'save session' and the video, loop start, loop end, and playback speed will be saved and your session id will appear in the 'manage session' section
          </div>
          <div>
            8. copy the session id and save it somewhere on your computer. The next time you visit the site, you can paste the session id into the 'submit session id' box in the 'get started' section. When you hit submit, your video should automatically pop up and start playing where you left off.
          </div>
          <div>
            NOTE: MAKING THE VIDEO FULL SCREEN AND/OR ADJUSTING THE VIDEO PLAYER'S VOLUME WILL CAUSE IRREGULARITIES
          </div>
        </div>
      </div>
    );
  };
};


// // react hooks practice
// const Counter = () => {
//   const [ count, setCount ] = useState(0);
//   const [ farks, setFarks ] = useState(0);
//   return (
//     <div>
//       <div>
//         =============== hooks practice ================
//       </div>
//       <p>you have clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)} >
//         click me
//       </button>
//       <p>you have farked {farks} times</p>
//       <button onClick={() => setFarks(farks - 1)} >
//         subtract fark
//       </button>
//       <button onClick={() => setFarks(farks + 1)} >
//         add fark
//       </button>
//       <div>
//         ===========================================
//       </div>
//     </div>
//   );
// };

export default App;
