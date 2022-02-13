import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Palette from '../components/Palette/Palette';
import ReturnArrow from './../assets/returnArrow.svg';

const SavedPalettes = ({ savedPalettes }) => {
  console.log(savedPalettes);
  return (
    <Wrapper>
      <StyledLink to="/" img={ReturnArrow} />
      <PalettesContainer>
        {savedPalettes.map((palette, i) => (
          <Palette key={i} palette={palette} />
        ))}
      </PalettesContainer>
    </Wrapper>
  );
};

const mapToStateProps = state => {
  console.log(state);
  const savedPalettes = state;
  return savedPalettes;
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
