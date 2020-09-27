import React, { useState } from 'react';


const LoopControls = (props) => {
  const {
    setLoopStart,
    setLoopEnd,
    clearLoop,
    nudgeLoopStart,
    nudgeLoopEnd,
    hearTransition
  } = props;

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
            onClick={() => {nudgeLoopStart(-0.1);}} >
            left
          </button>
          <button
            className="nudgeStartRight"
            onClick={() => {nudgeLoopStart(0.1);}} >
            right
          </button>
        </div>
        <div className="hearTransitionDiv">
          <button
            className="hearTransitionButton"
            onClick={() => {hearTransition();}} >
            hear transition
          </button>
        </div>
        <div className="nudgeLoopEndDiv">
          nudge loop end:
          <button
            className="nudgeEndLeft"
            onClick={() => {nudgeLoopEnd(-0.1);}} >
            left
          </button>
          <button
            className="nudgeEndRight"
            onClick={() => {nudgeLoopEnd(0.1);}} >
            right
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoopControls;