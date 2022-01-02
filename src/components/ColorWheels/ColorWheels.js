import React, { useState } from 'react';
import styled from 'styled-components';
import TopWheel from './TopWheel';
import BottomWheel from './BottomWheel';
import Tooltip from './../Tooltip/Tooltip';
import { showSaveInformation } from './../../utils/utils';

const ColorWheels = () => {
//   const [topTooltipVisible, setTopTooltipVisible] = useState(false);
//   const [bottomTooltipVisible, setBottomTooltipVisible] = useState(false);
//   const [topTooltipPosition, setTopTooltipPosition] = useState({});
//   const [bottomTooltipPosition, setBottomTooltipPosition] = useState({});


//   const copyToClipboard = e => {
//     const clickedBtn = e.target;

//     const color = clickedBtn.getAttribute('color');
//     if (color.includes('rgb')) {
//       navigator.clipboard.writeText(color).then(_ => {
//         setBottomTooltipPosition({
//           x: clickedBtn.offsetLeft + clickedBtn.offsetWidth / 2 - 10,
//           y: clickedBtn.offsetTop - clickedBtn.offsetHeight + 10,
//         });
//         setBottomTooltipVisible(true);
//         setTimeout(() => setBottomTooltipVisible(false), 1500);
//       });
//     } else {
//       navigator.clipboard.writeText(color).then(_ => {
//         setTopTooltipPosition({
//           x: clickedBtn.offsetLeft + clickedBtn.offsetWidth / 2,
//           y: clickedBtn.offsetTop - clickedBtn.offsetHeight + 10,
//         });
//         setTopTooltipVisible(true);
//         setTimeout(() => setTopTooltipVisible(false), 1000);
//       });
//     }
//   };

  return (
    <Wrapper>
      <TopWheel />
      <BottomWheel />
    </Wrapper>
  );
};

export default ColorWheels;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
