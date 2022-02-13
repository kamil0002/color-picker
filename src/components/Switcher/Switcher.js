import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { changeViewAction } from '../../actions';

const Switcher = ({ changeView, activeView }) => {
  return (
    <Wrapper>
      <PalettesOption
        onClick={() => changeView('palettes')}
        active={activeView === 'palettes'}
      >
        Palettes
      </PalettesOption>
      <ColorsOption
        onClick={() => changeView('colors')}
        active={activeView === 'colors'}
      >
        Colors
      </ColorsOption>
    </Wrapper>
  );
};

const mapDispatchToProps = dispatch => ({
  changeView: currentView => dispatch(changeViewAction(currentView)),
});

const mapToStateProps = state => {
  const { savedColorsView: activeView } = state;
  return { activeView };
};

export default connect(mapToStateProps, mapDispatchToProps)(Switcher);

const Wrapper = styled.div`
  margin-left: 8rem;
  display: flex;

  @media only screen and (max-width: 800px) {
    margin-left: 0;
  }

  @media only screen and (max-width: 650px) {
    flex-basis: 60%;
  }
`;

const PalettesOption = styled.div`
  width: 120px;
  background-color: ${({ theme, active }) =>
    active ? theme.colorPrimary : '#a4acb2'};
  text-align: start;
  padding: 0.8rem 4rem 0.8rem 1.3rem;
  clip-path: polygon(0 0, 100% 0%, 71% 100%, 0% 100%);
  position: relative;
  left: 16%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  transition: all 100ms ease-out;
  cursor: pointer;

  @media only screen and (max-width: 650px) {
    width: 140px;
  }
`;

const ColorsOption = styled.div`
  width: 110px;
  background-color: ${({ theme, active }) =>
    active ? theme.colorPrimary : '#a4acb2'};
  padding: 0.8rem 1.3rem 0.8rem 4rem;
  clip-path: polygon(32% 0, 100% 0%, 100% 100%, 0 100%);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  transition: all 100ms ease-out;
  cursor: pointer;
`;
