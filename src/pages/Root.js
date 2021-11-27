import React from 'react';
import styled from 'styled-components';
import ColorGenerator from '../components/ColorGenerator/ColorGenerator';
import ColorWheels from '../components/ColorWheels/ColorWheels';

const Wrapper = styled.div`
  padding: 60px 0 40px;
  display: flex;
  justify-content: space-evenly;

  @media only screen and (max-width: 750px) {
    padding: 60px 40px 40px;
    flex-direction: column;
    align-items: center;

}
`;

const Root = () => {
  return (
    <Wrapper>
      <ColorGenerator />
      <ColorWheels />
    </Wrapper>
  );
};

export default Root;
