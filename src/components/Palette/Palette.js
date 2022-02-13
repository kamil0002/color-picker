import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ColorCircle from './../ColorCircle/ColorCircle';
import convertRGBtoHex from './../../utils/RGBToHex';
import Button from './../Button/Button';
import { deletePaletteAction } from '../../actions';

const Palette = ({ palette, deletePalette }) => {
  console.log('pal ', palette);

  const generateColorElements = () => {
    console.log(palette);
  };

  return (
    <Wrapper>
      <PaletteWrapper>
        <Header>Color palette</Header>
        <PaletteContent id={palette['id']}>
          {palette['colors'].map((color, i) => (
            <ColorCircleWrapper key={i}>
              <StyledColorCircle color={convertRGBtoHex(color)} />
              <ColorValue>{convertRGBtoHex(color)}</ColorValue>
            </ColorCircleWrapper>
          ))}
          {generateColorElements()}
        </PaletteContent>
        <PaletteActions>
          <StyledButton onClick={e => deletePalette(e)}>Delete</StyledButton>
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
  width: 500px;
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
`;

const StyledColorCircle = styled(ColorCircle)`
  cursor: default;
`;

const ColorCircleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColorValue = styled.p`
  color: ${({ theme }) => theme.white};
`;

const PaletteActions = styled.div`
  margin-top: 1.2rem;
`;

const StyledButton = styled(Button)`
  width: 100px;
  margin: 0 auto;
`;
