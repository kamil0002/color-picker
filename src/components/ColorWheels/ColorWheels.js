import React from 'react'
import styled from 'styled-components';
import TopWheel from './TopWheel';
import BottomWheel from './BottomWheel';

const Wrapper = styled.div`
 display: flex;
 flex-direction: column;
`;

const ColorWheels = () => {
     return (
          <Wrapper>
               <TopWheel/>
               <BottomWheel />
          </Wrapper>
     )
}

export default ColorWheels
