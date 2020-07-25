import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: 'https://www.youtube.com/watch?v=aa2C0gf4lls',
      loopStart: 0,
      loopEnd: 0,
      currentPlaybackPosition: 0
    }
  };

  setVideoUrl(videoUrl) {
    console.log('url: ', url);
    this.setState({ videoUrl });
  };

  setSpeed() {

  };

  setStartPos() {

  };

  setEndPos() {

  };

  playVideo() {

  };

  pauseVideo() {

  };

  getLoopParams() {

  };

  setLoopParams() {

  };

  render() {
    const { videoUrl, loopStart, loopEnd, currentPlaybackPosition } = this.state;
    console.log('videoUrl: ', videoUrl);
    return (
        <div className="AppComponentDiv">
          App component main div
        </div>
    );
  };
};

export default App;