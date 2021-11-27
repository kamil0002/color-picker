import React from 'react';
import styled from 'styled-components';
import PaletteIcon from './../../assets/paletteIcon.svg';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.navColor};
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  -webkit-box-shadow: 0px 29px 38px -31px rgba(66, 68, 90, 1);
  -moz-box-shadow: 0px 29px 38px -31px rgba(66, 68, 90, 1);
  box-shadow: 0px 29px 38px -31px rgba(66, 68, 90, 1);

  @media only screen and (max-width: 500px) {
    font-size: ${({theme}) => theme.fontSize.small};
    padding: 0 25px;
    height: 60px;
  }
`;

const Header = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.large};

  @media only screen and (max-width: 700px) {
    font-size: ${({ theme }) => theme.fontSize.regular};
  }

  @media only screen and (max-width: 500px) {
    font-size: ${({theme}) => theme.fontSize.small};
  }
`;

const SavedPalettes = styled.a`
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.regular};
  font-weight: ${({ theme }) => theme.fontThin};
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    @media only screen and (max-width: 700px) {
      display: none;
    }
  }
`;
const PaletteImage = styled.img`
  margin-left: 10px;
`;

const Navigation = () => {
  return (
    <Wrapper>
      <Header>Create your best color palette</Header>
      <SavedPalettes>
        <span>Saved colors</span>
        <PaletteImage src={PaletteIcon} />
      </SavedPalettes>
    </Wrapper>
  );
};

export default Navigation;
