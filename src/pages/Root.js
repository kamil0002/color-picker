import React from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import store from './../store';
import ColorGenerator from '../components/ColorGenerator/ColorGenerator';
import ColorWheels from '../components/ColorWheels/ColorWheels';

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
    <Provider store={store}>
      <Wrapper>
        <ColorGenerator />
        <ColorWheels />
      </Wrapper>
    </Provider>
  );
};

export default Root;
