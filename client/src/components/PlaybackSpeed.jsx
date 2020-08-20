import React from 'react';

const PlaybackSpeed = (props) => {
  const { handleSpeedChange, setSpeed } = props;
  return (
    <div className="PlaybackSpeedComponentDiv">
      <input
        type="text"
        onChange={(event) => {
          handleSpeedChange(event.target.value);
        }} />
      <button
        value="change speed"
        onClick={(event) => {
          setSpeed();
        }}>
          change speed
      </button>
    </div>
  );
};

export default PlaybackSpeed;