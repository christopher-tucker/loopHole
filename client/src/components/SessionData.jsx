import React from 'react';

const SessionData = (props) => {
  const { sessionId, videoUrl, startTime, endTime, speed } = props;
  return (
    <div className="SessionDataComponentDiv">
      <div>
        <span style={{"fontWeight": "bold"}}>session id: </span>
        {sessionId}
      </div>
      <div>
        <span style={{"fontWeight": "bold"}}>video url: </span>
        {videoUrl}
      </div>
      <div>
        <span style={{"fontWeight": "bold"}}>loop start time: </span>
        {startTime}
      </div>
      <div>
        <span style={{"fontWeight": "bold"}}>loop end time: </span>
        {endTime}
      </div>
      <div>
        <span style={{"fontWeight": "bold"}}>playback speed: </span>
        {speed}
      </div>
    </div>
  );
};

export default SessionData;
