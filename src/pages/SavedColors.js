import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Palette from '../components/Palette/Palette';
import Switcher from '../components/Switcher/Switcher';
import ColorCircle from '../components/ColorCircle/ColorCircle';
import Tooltip from './../components/Tooltip/Tooltip';
import Form from '../components/Form/Form';
import isHex from '../utils/validateHexColor';
import { saveUserColorAction } from '../actions';
import { deleteColorAction } from '../actions';
import RGBToHex from './../utils/RGBToHex';

const SavedPalettes = ({
  savedPalettes,
  savedColors,
  savedUserColors,
  activeView,
  saveUserColor,
  deleteColor,
}) => {
  const [addColorFormVisible, setAddColorFormVisible] = useState(false);
  const [deleteColorFormVisible, setDeleteColorFormVisible] = useState(false);
  const [wrongColorFormat, setWrongColorFormat] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({});
  const [timeoutId, setTimeoutId] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const copyToClipboard = (e, color, yOffset) => {
    clearTimeout(timeoutId);
    const clickedBtn = e.target;
    navigator.clipboard.writeText(color).then(_ => {
      setTooltipPosition({
        x: clickedBtn.offsetLeft + clickedBtn.offsetWidth / 2 - 10,
        y:
          clickedBtn.offsetTop -
          clickedBtn.offsetHeight +
          (yOffset ? yOffset : 25),
      });
      setTooltipVisible(true);
      setTimeoutId(setTimeout(() => setTooltipVisible(false), 500));
    });
  };

  const copyPalette = e => {
    const paletteId = +e.target.parentNode.previousSibling.getAttribute('id');
    const palette = savedPalettes.find(palette => palette.id === paletteId)
      .colors;
    const formattedColors = palette
      .map(color => {
        return RGBToHex(color);
      })
      .join('\n');
    copyToClipboard(e, formattedColors, 8);
  };

  const controlAddColorFormVisibility = () => {
    setWrongColorFormat(false);
    setAddColorFormVisible(!addColorFormVisible);
    if (deleteColorFormVisible) setDeleteColorFormVisible(false);
  };

  const controlDeleteColorFormVisibility = () => {
    setWrongColorFormat(false);
    setDeleteColorFormVisible(!deleteColorFormVisible);
    if (addColorFormVisible) setAddColorFormVisible(false);
  };

  const hideForm = () => {
    if (addColorFormVisible) setAddColorFormVisible(false);
    if (deleteColorFormVisible) setDeleteColorFormVisible(false);
  };

  const addColorHandler = e => {
    const enteredColor = e.target.getAttribute('color');
    if (!isHex(enteredColor)) {
      setWrongColorFormat(true);
      return;
    }
    saveUserColor(`#${enteredColor}`);
    hideForm();
  };
  const deleteColorHandler = e => {
    const enteredColor = e.target.getAttribute('color');
    if (!isHex(enteredColor)) {
      setWrongColorFormat(true);
      return;
    }
    hideForm();
    deleteColor(`#${enteredColor}`);
  };

  return (
    <Wrapper>
      {tooltipVisible && <Tooltip position={tooltipPosition}>Copied</Tooltip>}
      <Background
        onClick={hideForm}
        bgVisible={addColorFormVisible || deleteColorFormVisible}
      />
      {addColorFormVisible && (
        <Form
          headerText="Add Color"
          buttonText="Add"
          wrongColorFormat={wrongColorFormat}
          buttonAction={e => addColorHandler(e)}
          clearError={() => setWrongColorFormat(false)}
        />
      )}
      {deleteColorFormVisible && (
        <Form
          headerText="Delete Color"
          buttonText="Delete"
          wrongColorFormat={wrongColorFormat}
          buttonAction={e => deleteColorHandler(e)}
          clearError={() => setWrongColorFormat(false)}
        />
      )}
      <LocalNavWrapper>
        <StyledLink to="/"> &larr; Return</StyledLink>
        <Switcher />
        <ActionsWrapper>
          <AddColor onClick={controlAddColorFormVisibility}>Add Color</AddColor>
          <DeleteColor onClick={controlDeleteColorFormVisibility}>
            Delete Color
          </DeleteColor>
        </ActionsWrapper>
      </LocalNavWrapper>
      {activeView === 'palettes' && (
        <PalettesContainer>
          {savedPalettes.map((palette, i) => (
            <Palette
              key={i}
              palette={palette}
              copyPaletteHandler={e => copyPalette(e)}
            />
          ))}
        </PalettesContainer>
      )}
      {activeView === 'colors' && (
        <ColorsContainer>
          <ColorGroup>
            <Header>Application Colors</Header>
            <ApplicationColors>
              {savedColors.map((color, i) => (
                <ColorCircleWrapper key={i}>
                  <StyledColorCircle
                    onClick={e => copyToClipboard(e, color)}
                    color={color}
                  />
                  <ColorValue>{color}</ColorValue>
                </ColorCircleWrapper>
              ))}
            </ApplicationColors>
          </ColorGroup>
          <ColorGroup>
            <Header>Your Colors</Header>
            <UserColors>
              {savedUserColors.map((color, i) => (
                <UserColorCircleWrapper key={i}>
                  <StyledColorCircle
                    color={color}
                    onClick={e => copyToClipboard(e, color)}
                  />
                  <ColorValue>{color}</ColorValue>
                </UserColorCircleWrapper>
              ))}
            </UserColors>
          </ColorGroup>
        </ColorsContainer>
      )}
    </Wrapper>
  );
};

const mapToStateProps = state => {
  const {
    savedPalettes,
    savedColors,
    savedUserColors,
    savedColorsView: activeView,
  } = state;
  return { savedPalettes, savedColors, activeView, savedUserColors };
};

const mapDispatchToProps = dispatch => ({
  saveUserColor: color => dispatch(saveUserColorAction(color)),
  deleteColor: color => dispatch(deleteColorAction(color)),
});

export default connect(mapToStateProps, mapDispatchToProps)(SavedPalettes);

const Wrapper = styled.div``;

const Background = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 70%);
  z-index: 11111;
  display: ${({ bgVisible }) => (bgVisible ? 'block' : 'none')};
`;

const LocalNavWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  margin: 3rem 3rem 3rem 4rem;
  text-decoration: none;
  color: ${({ theme }) => theme.white};
  font-size: 1.9rem;
  transition: all 200ms ease-out;
  border-bottom: 1px solid transparent;


  &:hover {
    transform: translateY(-5%);
    border-bottom: 1px solid ${({ theme }) => theme.white};
  }

  @media only screen and (max-width: 840px) {
    margin: 2rem;
    margin-right: 0;
  }
`;

const ActionsWrapper = styled.div`
  flex: 1;
  text-align: right;
  margin-right: 5rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  @media only screen and (max-width: 800px) {
    margin-right: 2rem;
  }

  @media only screen and (max-width: 400px) {
    margin-top: 4rem;
  }
`;

const AddColor = styled.a`
  padding: 0.8rem 2rem;
  background: ${({ theme }) => theme.colorPrimary};
  color: ${({ theme }) => theme.white};
  margin-right: 4rem;
  cursor: pointer;

  @media only screen and (max-width: 800px) {
    margin-right: 2rem;
  }
`;

const DeleteColor = styled.a`
  padding: 0.8rem 2rem;
  background: ${({ theme }) => theme.colorPrimary};
  color: ${({ theme }) => theme.white};
  cursor: pointer;
`;

const ColorGroup = styled.div``;

const Header = styled.h2`
  margin-bottom: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.white};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

const PalettesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 95vw;
  margin: 0 auto;
`;

const ColorsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  margin: 8rem auto 2rem;
`;

const ApplicationColors = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: 48%;
  padding: 0 1rem 0 3rem;
`;

const UserColors = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: 48%;
`;

const ColorCircleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin-right: 3rem;
`;

const UserColorCircleWrapper = styled(ColorCircleWrapper)`
  margin-right: 0;
  margin-left: 3rem;
`;

const StyledColorCircle = styled(ColorCircle)``;

const ColorValue = styled.p`
  color: ${({ theme }) => theme.white};
`;
