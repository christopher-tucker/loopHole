import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { bounce } from 'react-animations'

// https://reactjs.org/docs/hooks-custom.html
// const bounceAnimation = keyframes`${bounce}`;


const QuickKeysModal = () => {
  // state
  const [ display, setDisplay ] = useState('hide');
  // styling
  const modalStyle = {
    textAlign: display === 'show' ? 'center' : 'right',
    border: '1px solid black',
    position: 'center',
    height: '66%',
    width: '66%',
    left: '16%'
  };

  const wrapperStyle = {

  };

  return (
    <div className="modal-wrapper">
      <div
        style={modalStyle}
        onClick={() => {
          if (display === 'hide') {
            setDisplay('show');
          } else {
            setDisplay('hide');
          }
        }}>
      </div>
    </div>
  );
};


export default QuickKeysModal;
