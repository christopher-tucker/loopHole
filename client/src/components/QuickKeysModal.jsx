import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


// NOT WORKING.. CONTINUE TO FIGURE OUT CUSTOM HOOKS AND CONDITIONAL RENDERING HERE:
// https://reactjs.org/docs/hooks-custom.html
// const StyledModal = styled.div`
//   fontWeight: {weight};
// `;

const QuickKeysModal = () => {
  const [ display, setDisplay ] = useState('hide');
  const modalStyle = {
    fontWeight: display === 'show' ? 'bold' : 'normal',
    textAlign: display === 'show' ? 'center' : 'right'
  }
  return (
    <div
      style={modalStyle}
      onClick={() => {
        if (display === 'hide') {
          setDisplay('show');
        } else {
          setDisplay('hide');
        }
      }}>
      this is the style
    </div>
  );
};


export default QuickKeysModal;


// // // react hooks practice
// // const Counter = () => {
// //   const [ count, setCount ] = useState(0);
// //   const [ farks, setFarks ] = useState(0);
// //   return (
// //     <div>
// //       <div>
// //         =============== hooks practice ================
// //       </div>
// //       <p>you have clicked {count} times</p>
// //       <button onClick={() => setCount(count + 1)} >
// //         click me
// //       </button>
// //       <p>you have farked {farks} times</p>
// //       <button onClick={() => setFarks(farks - 1)} >
// //         subtract fark
// //       </button>
// //       <button onClick={() => setFarks(farks + 1)} >
// //         add fark
// //       </button>
// //       <div>
// //         ===========================================
// //       </div>
// //     </div>
// //   );
// // };