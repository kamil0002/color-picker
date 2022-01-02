import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import lockOff from './../../assets/lockOff.svg';
import lockOn from './../../assets/lockOn.svg';
import { connect } from 'react-redux';
import { rerollColorsAction } from '../../actions';
import { updateLocksColorsAction } from '../../actions';

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

  ${({ displayIcon }) => console.log(displayIcon)};
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

const ColorGenerator = ({
  generatedColors: randomColors,
  rerollColors,
  updateLocksColors,
  lockedColors,
}) => {

  return (
    <Wrapper>
      <PaletteWrapper>
        <Header>Color Generator</Header>
        <ColorsPalette>
          {randomColors.map((color, i) => (
            <Color
              icon={lockedColors[i] ? lockOn : lockOff}
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
          <Button>Save palette</Button>
        </ButtonGroup>
      </PaletteWrapper>

      <RandomColorWrapper>
        <Button randomColor>Generate random color</Button>
        <ButtonGroup>
          <Button randomColor>Copy color</Button>
          <Button randomColor>Save color</Button>
        </ButtonGroup>
      </RandomColorWrapper>
    </Wrapper>
  );
};

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

const mapToStateProps = state => {
  const generatedColors = state;
  const lockedColors = state;
  return { ...generatedColors, ...lockedColors };
};

const mapDispatchToProps = dispatch => ({
  rerollColors: () => dispatch(rerollColorsAction()),
  updateLocksColors: i => dispatch(updateLocksColorsAction(i)),
});

export default connect(mapToStateProps, mapDispatchToProps)(ColorGenerator);
