import styled, { ThemeProvider } from 'styled-components';
import Root from './pages/Root';
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
    <div>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Navigation />
        <Overlay />
        <Root />
      </ThemeProvider>
    </div>
  );
}

export default App;
