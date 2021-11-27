import React from 'react'
import styled from 'styled-components';
import TopWheel from './TopWheel';
import BottomWheel from './BottomWheel';

const Wrapper = styled.div``;

const ColorWheels = () => {
     return (
          <Wrapper>
               <TopWheel 
                    color="#fffefa"
               />
               <BottomWheel />
          </Wrapper>
     )
}

export default ColorWheels
