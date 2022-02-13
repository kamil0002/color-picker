import styled, { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import store from './store';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Root from './pages/Root';
import SavedColors from './pages/SavedColors';
import GlobalStyles from './theme/GlobalStyles';
import theme from './theme/theme';
import Navigation from './components/Navigation/Navigation';

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

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
