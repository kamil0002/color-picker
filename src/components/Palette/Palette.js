import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import convertRGBtoHex from './../../utils/RGBToHex';
import ColorCircle from './../ColorCircle/ColorCircle';
import Button from './../Button/Button';
import { deletePaletteAction } from '../../actions';

const Palette = ({ palette, deletePalette, copyPaletteHandler }) => {

  return (
    <Wrapper>
      <PaletteWrapper>
        <Header>Color palette</Header>
        <PaletteContent id={palette['id']}>
          {palette['colors'].map((color, i) => (
            <ColorCircleWrapper key={i}>
              <ColorElement>
                <StyledColorCircle color={convertRGBtoHex(color)} />
                <ColorValue>{convertRGBtoHex(color)}</ColorValue>
              </ColorElement>
            </ColorCircleWrapper>
          ))}
        </PaletteContent>
        <PaletteActions>
          <StyledButton onClick={e => deletePalette(e)}>Delete</StyledButton>
          <StyledButton onClick={copyPaletteHandler}>Copy</StyledButton>
        </PaletteActions>
      </PaletteWrapper>
    </Wrapper>
  );
};

const mapDispatchToProps = dispatch => ({
  deletePalette: e => dispatch(deletePaletteAction(e)),
});

export default connect(null, mapDispatchToProps)(Palette);

const Wrapper = styled.div`
  max-width: 88vw;
  margin: 8rem auto 2rem;
`;

const PaletteWrapper = styled.div`
  background: #85b6ff;
  border-radius: 8px;
  text-align: center;
  padding-bottom: 2rem;
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.white};
  padding: 1.2rem 0 2.1rem;
`;

const PaletteContent = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 2rem;
  flex-wrap: wrap;
`;

const StyledColorCircle = styled(ColorCircle)`
  cursor: default;
  margin: auto;

  @media only screen and (max-width: 500px) {
    &:last-of-type {
      position: relative;
      bottom: auto;
    }
  }
`;

const ColorCircleWrapper = styled.div`

  &:not(:nth-last-child(1)) {
    margin-right: 2rem;
  }

  @media only screen and (max-width: 500px) {
    margin: auto;
  }
`;

const ColorElement = styled.div``;

const ColorValue = styled.p`
  color: ${({ theme }) => theme.white};
`;

const PaletteActions = styled.div`
  margin-top: 1.2rem;
  display: flex;
`;

const StyledButton = styled(Button)`
  width: 100px;
  margin: 0 auto;
`;
