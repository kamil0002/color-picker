import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';

const Wrapper = styled.div`
  max-width: 500px;
`;

const PaletteWrapper = styled.div`
  background-color: #85b6ff;
  z-index: 1;
  padding: 40px 30px 50px;
  border-bottom: 1px solid ${({ theme }) => theme.fontColor};
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
  border: 1px solid ${({ theme }) => theme.fontColor};
  background-color: ${({ color }) => `rgb(${color})`};
  position: relative;
  justify-self: center;

  @media only screen and (max-width: 500px) {
   &:last-of-type {
     position: absolute;
     bottom: 0;
  }
}
`;

const ColorHex = styled.span`
  position: absolute;
  bottom: -50%;
  left: 50%;
  transform: translateX(-50%);
  font-weight: ${({ theme }) => theme.fontThin};
  color: ${({ theme }) => theme.fontColor};
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

const ColorGenerator = () => {
  return (
    <Wrapper>
      <PaletteWrapper>
        <ColorsPalette>
          <Color color="29 21 45">
            <ColorHex>#456b53</ColorHex>
          </Color>
          <Color color="59 31 115">
            <ColorHex>#456b53</ColorHex>
          </Color>
          <Color color="159 212 15">
            <ColorHex>#456b53</ColorHex>
          </Color>
          <Color color="211 111 111">
            <ColorHex>#456b53</ColorHex>
          </Color>
          <Color color="255 20 111">
            <ColorHex>#456b53</ColorHex>
          </Color>
        </ColorsPalette>
        <ButtonGroup>
          <Button>Roll</Button>
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

export default ColorGenerator;
