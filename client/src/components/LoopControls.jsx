import React from 'react';

const LoopControls = (props) => {
  const { setLoopStart, setLoopEnd, clearLoop } = props;
  return (
    <div className="LoopControlsComponentDiv">
      <button
        className="setStartTimeButton"
        onClick={() => {setLoopStart();}} >
        set start
      </button>
      <button
        className="setEndTimeButton"
        onClick={() => {setLoopEnd();}} >
        set end
      </button>
      <button
        className="clearLoopButton"
        onClick={() => {clearLoop();}} >
        clear loop
      </button>
    </div>
  );
};

export default LoopControls;