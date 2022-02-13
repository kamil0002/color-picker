import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import Root from './pages/Root';
import SavedColors from './pages/SavedColors';
import GlobalStyles from './theme/GlobalStyles';
import theme from './theme/theme';
import Navigation from './components/Navigation/Navigation';
import { loadStorageDataAction } from './actions';

function App({ loadStorageData }) {
  useEffect(() => {
    const savedPalettesStorage = JSON.parse(localStorage.getItem('palettes'));
    const appColorsStorage = JSON.parse(localStorage.getItem('app-colors'));
    const userColorsStorage = JSON.parse(localStorage.getItem('user-colors'));

    loadStorageData({
      savedPalettesStorage,
      appColorsStorage,
      userColorsStorage,
    });
  }, []);

  return (
    <Router>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Navigation />
        <Overlay />
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/saved" element={<SavedColors />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

const mapDispatchToProps = dispatch => ({
  loadStorageData: values => dispatch(loadStorageDataAction(values)),
});

export default connect(null, mapDispatchToProps)(App);

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-image: radial-gradient(
    100% 197.75% at 0% 0%,
    rgba(255, 255, 255, 0.42) 0%,
    rgba(255, 255, 255, 0.06) 100%
  );
  backdrop-filter: blur(4px);
  z-index: -1;
`;
