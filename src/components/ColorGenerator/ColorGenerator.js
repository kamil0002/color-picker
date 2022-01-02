import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import lockOff from './../../assets/lockOff.svg';
import lockOn from './../../assets/lockOn.svg';
import { connect } from 'react-redux';
import { rerollColorsAction } from '../../actions';
import { updateLocksColorsAction } from '../../actions';
import { resetRolledColors } from '../../actions';
import Tooltip from './../Tooltip/Tooltip';

const convertRGBtoHex = rgbString => {
  const rgbArray = rgbString.split(',');
  const rgbAsNumbers = rgbArray.map(color => Number.parseInt(color));
  return (
    '#' +
    rgbAsNumbers
      .map(color =>
        color.toString(16).length === 1
          ? 0 + color.toString(16).toUpperCase()
          : color.toString(16).toUpperCase()
      )
      .join('')
  );
};

const ColorGenerator = ({
  generatedColors: randomColors,
  rerollColors,
  updateLocksColors,
  resetRolledColors,
}) => {
  const [tooltipPosition, setTooltipPosition] = useState({});
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [tooltipText, setTooltipText] = useState('');

  const copyToClipboard = e => {
    clearTimeout(timeoutId)
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
    clearTimeout(timeoutId)
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
    <Wrapper>
      <PaletteWrapper>
        <Header>Color Generator</Header>
        <ColorsPalette>
          {randomColors.map((color, i) => (
            <Color
              icon={randomColors[i].locked ? lockOn : lockOff}
              key={color.id}
              id={color.id}
              color={convertRGBtoHex(color.RGBColor)}
              onClick={() => updateLocksColors(i)}
            >
              <ColorHex>{convertRGBtoHex(color.RGBColor)}</ColorHex>
            </Color>
          ))}
        </ColorsPalette>
        <ButtonGroup>
          <Button onClick={() => rerollColors()}>Roll</Button>
          <Button onClick={(e) => saveColorHandler(e)}>Save palette</Button>
          <Button onClick={() => resetRolledColors()}>Reset</Button>
        </ButtonGroup>
      </PaletteWrapper>

      <RandomColorWrapper>
        <Button randomColor>Generate random color</Button>
        <ButtonGroup>
        {tooltipVisible && (
        <Tooltip position={tooltipPosition}>{tooltipText}</Tooltip>
      )}
          <Button onClick={e => copyToClipboard(e)} randomColor>
            Copy color
          </Button>
          <Button randomColor onClick={(e) => saveColorHandler(e)}>Save color</Button>
        </ButtonGroup>
      </RandomColorWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 500px;

  @media only screen and (max-width: 1200px) {
    margin-bottom: 50px;
  }
  @media only screen and (max-width: 540px) {
    width: 400px;
  }
  @media only screen and (max-width: 440px) {
    width: 300px;
  }
`;

const PaletteWrapper = styled.div`
  background-color: #85b6ff;
  z-index: 1;
  padding: 40px 30px 50px;
  border-bottom: 1px solid ${({ theme }) => theme.white};
  border-radius: 8px 8px 0 0;
`;

const ColorsPalette = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: space-between;

  @media only screen and (max-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-row-gap: 40px;
    position: relative;
  }
  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
`;

const Color = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.white};
  background-color: ${({ color }) => color};

  position: relative;
  justify-self: center;
  cursor: pointer;

  @media only screen and (max-width: 500px) {
    &:last-of-type {
      position: absolute;
      bottom: 0;
    }
  }

  &::after {
    content: '';
    position: absolute;
    background-image: ${({ icon }) => `url(${icon})`};
    background-repeat: no-repeat;
    background-position: center;
    inset: 0;
    opacity: 0;
    transition: all 150ms ease-in;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }
`;

const ColorHex = styled.span`
  position: absolute;
  bottom: -50%;
  left: 50%;
  transform: translateX(-50%);
  font-weight: ${({ theme }) => theme.fontThin};
  color: ${({ theme }) => theme.white};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 80px;

  @media only screen and (max-width: 500px) {
    flex-direction: column;
    height: 150px;
  }
`;

const RandomColorWrapper = styled.div`
  background-color: blueviolet;
  display: flex;
  flex-direction: column;
  padding: 40px 0px;
  border-radius: 0 0 8px 8px;
`;

const Header = styled.h2`
  margin: 0 0 2.4rem;
  color: ${({ theme }) => theme.white};
  text-align: center;
`;

const mapToStateProps = state => {
  const generatedColors = state;
  return generatedColors;
};

const mapDispatchToProps = dispatch => ({
  rerollColors: () => dispatch(rerollColorsAction()),
  updateLocksColors: index => dispatch(updateLocksColorsAction(index)),
  resetRolledColors: () => dispatch(resetRolledColors()),
});

export default connect(mapToStateProps, mapDispatchToProps)(ColorGenerator);
