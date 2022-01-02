import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import iro from '@jaames/iro';
import Button from './../Button/Button';

const TopWheel = () => {
  const [currentColor, setCurrentColor] = useState('#6e97cc');
  const onColorChange = ({ hexString }) => setCurrentColor(hexString);

  useEffect(() => {
    const colorPicker = new iro.ColorPicker('#picker', {
      width: 220,
      color: '#6e97cc',
      borderWidth: 2.2,
      borderColor: '#fafafa',
    });
    colorPicker.on('color:change', onColorChange);
  }, []);

  return (
    <Wrapper backgroundColor={currentColor}>
      <WheelWrapper>
        <ColorHex>{currentColor}</ColorHex>
        <Wheel id="picker"></Wheel>
      </WheelWrapper>
      <ButtonGroup>
        <Button>Copy hexcode</Button>
        <Button>Save color</Button>
      </ButtonGroup>
    </Wrapper>
  );
};

const Wrapper = styled.div.attrs(({ backgroundColor }) => ({
  style: {
    background: backgroundColor,
  },
}))`
  width: 600px;
  height: 360px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 5rem;

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

const ColorHex = styled.span`
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

const Wheel = styled.div``;

export default TopWheel;
