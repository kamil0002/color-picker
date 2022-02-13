import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './../Button/Button';
import ColorPicker from './ColorPicker';
import Tooltip from './../Tooltip/Tooltip';

const defaultColour = 'rgb(110, 151, 204)';

const BottomWheel = () => {
  const [currentColor, setCurrentColor] = useState(defaultColour);

  const [tooltipPosition, setTooltipPosition] = useState({});
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [tooltipText, setTooltipText] = useState('');

  const copyToClipboardHandler = e => {
    clearTimeout(timeoutId);

    const clickedBtn = e.target;
    const color = clickedBtn.getAttribute('color');
    navigator.clipboard.writeText(color).then(_ => {
      setTooltipPosition({
        x: clickedBtn.offsetLeft + clickedBtn.offsetWidth / 2 - 10,
        y: clickedBtn.offsetTop - clickedBtn.offsetHeight + 10,
      });
      setTooltipText('Copied!');
      setTooltipVisible(true);
      setTimeoutId(setTimeout(() => setTooltipVisible(false), 1500));
    });
  };

  const saveColorHandler = (e) => {
    clearTimeout(timeoutId);
    const clickedBtn = e.target;
      setTooltipPosition({
        x: clickedBtn.offsetLeft + clickedBtn.offsetWidth / 2 - 10,
        y: clickedBtn.offsetTop - clickedBtn.offsetHeight + 10,
      });
      setTooltipText('Saved!');
      setTooltipVisible(true);
      setTimeoutId(setTimeout(() => setTooltipVisible(false), 1500));
  };

  return (
    <Wrapper backgroundColor={currentColor}>
      <WheelWrapper>
        <ColorRGB>{currentColor}</ColorRGB>
        <ColorPicker
          radius={130}
          padding={6}
          lineWidth={50}
          onColourSelected={rgb => setCurrentColor(rgb)}
          onRef={ref => ref}
          spacers={{
            colour: '#FFFFFF',
            shadowColour: 'grey',
            shadowBlur: 5,
          }}
          preset
          presetColour={currentColor}
          animated
        />
      </WheelWrapper>
      <ButtonGroup>
      {tooltipVisible && (
        <Tooltip position={tooltipPosition}>{tooltipText}</Tooltip>
      )}
        <Button color={currentColor} onClick={(e) => copyToClipboardHandler(e)}>Copy RGB</Button>
        <Button onClick={(e) => saveColorHandler(e)}>Save color</Button>
      </ButtonGroup>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 600px;
  height: 360px;
  border-radius: 10px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media only screen and (max-width: 640px) {
    flex-direction: column;
    height: 480px;
    width: 400px;
    margin: 0 auto 5rem;
  }
  @media only screen and (max-width: 440px) {
    width: 300px;
  }
`;
const ColorRGB = styled.span`
  margin-bottom: 1.4rem;
  color: ${({ theme }) => theme.white};
  font-weight: ${({ theme }) => theme.fontThin};
  font-size: ${({ theme }) => theme.fontSize.regular};

  @media only screen and (max-width: 640px) {
    margin-top: 1.4rem;
  }
`;

const WheelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonGroup = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export default BottomWheel;
