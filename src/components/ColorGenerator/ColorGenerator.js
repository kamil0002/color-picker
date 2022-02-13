import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import Color from '../ColorCircle/ColorCircle';
import lockOff from './../../assets/lockOff.svg';
import lockOn from './../../assets/lockOn.svg';
import { connect } from 'react-redux';
import { rerollColorsAction } from '../../actions';
import { updateLockedColorsAction } from '../../actions';
import { resetRolledColorsAction } from '../../actions';
import { savePaletteAction } from '../../actions';
import { saveColorAction } from '../../actions';
import Tooltip from './../Tooltip/Tooltip';
import convertRGBtoHex from './../../utils/RGBToHex';

const ColorGenerator = ({
  generatedColors: randomColors,
  rerollColors,
  updateLockedColors,
  resetRolledColors,
  savePalette,
  saveColor,
}) => {
  const [tooltipPosition, setTooltipPosition] = useState({});
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [tooltipText, setTooltipText] = useState('');
  const [currentRandomColor, setCurrentRandomColor] = useState('#8A2BE2');

  const generateRandomColor = () => {
    let RGBColor = [];
    for (let i = 0; i < 3; i++) {
      RGBColor.push(Math.trunc(Math.random() * 255));
    }
    console.log(currentRandomColor);
    setCurrentRandomColor(convertRGBtoHex(RGBColor.join(',')));
  };

  const copyToClipboard = e => {
    clearTimeout(timeoutId);
    const clickedBtn = e.target;

    const color = clickedBtn.getAttribute('color');
    console.log(color);

    navigator.clipboard.writeText(color).then(_ => {
      setTooltipPosition({
        x: clickedBtn.offsetLeft + clickedBtn.offsetWidth / 2 - 10,
        y: clickedBtn.offsetTop - clickedBtn.offsetHeight + 10,
      });
      setTooltipText('Copied!');
      setTooltipVisible(true);
      setTimeoutId(setTimeout(() => setTooltipVisible(false), 500));
    });
  };

  const saveColorHandler = e => {
    clearTimeout(timeoutId);
    const clickedBtn = e.target;
    setTooltipPosition({
      x: clickedBtn.offsetLeft + clickedBtn.offsetWidth / 2 - 10,
      y: clickedBtn.offsetTop - clickedBtn.offsetHeight + 10,
    });
    setTooltipText('Saved!');
    setTooltipVisible(true);
    saveColor(currentRandomColor);
    savePalette();
    setTimeoutId(setTimeout(() => setTooltipVisible(false), 500));
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
              onClick={() => updateLockedColors(i)}
            >
              <ColorHex>{convertRGBtoHex(color.RGBColor)}</ColorHex>
            </Color>
          ))}
        </ColorsPalette>
        <ButtonGroup>
          <Button onClick={() => rerollColors()}>Roll</Button>
          <Button onClick={e => saveColorHandler(e)}>Save palette</Button>
          <Button onClick={() => resetRolledColors()}>Reset</Button>
        </ButtonGroup>
      </PaletteWrapper>

      <RandomColorWrapper color={currentRandomColor}>
        <Button onClick={generateRandomColor} randomColor>
          Generate random color
        </Button>
        <ButtonGroup>
          {tooltipVisible && (
            <Tooltip position={tooltipPosition}>{tooltipText}</Tooltip>
          )}
          <Button
            color={currentRandomColor}
            onClick={e => copyToClipboard(e)}
            randomColor
          >
            Copy color
          </Button>
          <Button randomColor onClick={e => saveColorHandler(e)}>
            Save color
          </Button>
        </ButtonGroup>
      </RandomColorWrapper>
    </Wrapper>
  );
};

const mapDispatchToProps = dispatch => ({
  rerollColors: () => dispatch(rerollColorsAction()),
  updateLockedColors: index => dispatch(updateLockedColorsAction(index)),
  resetRolledColors: () => dispatch(resetRolledColorsAction()),
  savePalette: () => dispatch(savePaletteAction()),
  saveColor: color => dispatch(saveColorAction(color)),
});

const mapToStateProps = state => {
  const generatedColors = state;
  return generatedColors;
};

export default connect(mapToStateProps, mapDispatchToProps)(ColorGenerator);

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
  background-color: ${({ color }) => color};
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
