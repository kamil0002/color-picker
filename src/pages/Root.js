import React from 'react';
import styled from 'styled-components';
import ColorGenerator from '../components/ColorGenerator/ColorGenerator';
import WheelsGroup from '../components/ColorWheels/WheelsGroup';

const Wrapper = styled.div`
  padding: 60px 0 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media only screen and (max-width: 1200px) {
    padding: 60px 40px 40px;
    flex-direction: column;
    align-items: center;
  }
`;

const Root = () => {
  return (
    <Wrapper>
      <ColorGenerator />
      <WheelsGroup />
    </Wrapper>
  );
};

export default Root;
