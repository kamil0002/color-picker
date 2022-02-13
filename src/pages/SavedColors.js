import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Palette from '../components/Palette/Palette';
import Switcher from '../components/Switcher/Switcher';
import ReturnArrow from './../assets/returnArrow.svg';
import ColorCircle from '../components/ColorCircle/ColorCircle';

const SavedPalettes = ({ savedPalettes, savedColors, activeView }) => {
  return (
    <Wrapper>
      <LocalNavWrapper>
        <StyledLink to="/" img={ReturnArrow} />
        <Switcher />
      </LocalNavWrapper>
      {activeView === 'palettes' && (
        <PalettesContainer>
          {savedPalettes.map((palette, i) => (
            <Palette key={i} palette={palette} />
          ))}
        </PalettesContainer>
      )}
      {activeView === 'colors' && (
        <ColorsContainer>
          {savedColors.map(color => (
            <ColorCircle color={color} />
          ))}
        </ColorsContainer>
      )}
    </Wrapper>
  );
};

const mapToStateProps = state => {
  const { savedPalettes, savedColors, savedColorsView: activeView } = state;
  return { savedPalettes, savedColors, activeView };
};

export default connect(mapToStateProps)(SavedPalettes);

const Wrapper = styled.div``;

const StyledLink = styled(Link)`
  display: block;
  width: 50px;
  height: 32px;
  background-image: ${({ img }) => `url(${img})`};
  background-repeat: no-repeat;
  background-size: cover;
  margin: 3rem;
`;

const LocalNavWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PalettesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 95vw;
  margin: 0 auto;

  @media only screen and (max-width: 550px) {
    display: block;
    margin: 0;
  }
`;

const ColorsContainer = styled.div``;
