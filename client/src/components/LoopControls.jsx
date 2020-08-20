import React from 'react';

const LoopControls = (props) => {
  const { setLoopStart, setLoopEnd, clearLoop, nudgeLoopStartLeft } = props;
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

      <div className="nudgeOptionsDiv">
        nudge options

        <div className="nudgeLoopStartDiv">
          nudge loop start:
          <button
            className="nudgeStartLeft"
            onClick={() => {nudgeLoopStartLeft();}} >
            left
          </button>
          <button
            className="nudgeStartRight" >
            right
          </button>
        </div>

        <div className="nudgeLoopEndDiv">
          nudge loop end:
          <button className="nudgeEndLeft" >
            left
          </button>
          <button
            className="nudgeEndRight" >
            right
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoopControls;