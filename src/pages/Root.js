import React from 'react';
import styled from 'styled-components';
import ColorGenerator from '../components/ColorGenerator/ColorGenerator';

const Wrapper = styled.div`
   padding: 60px 100px 40px;

   @media only screen and (max-width: 700px) {
      padding: 60px 50px 40px;
  }

`;

const Root = () => {
  return (
    <Wrapper>
      <ColorGenerator />
    </Wrapper>
  );
};

export default Root;
