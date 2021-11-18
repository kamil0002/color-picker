import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
   *,*::after,*::before {  
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        font-size: 62.5%;
    }

    body {
        margin: 0;
        padding: 0;
        font-size: 1.6rem;
        font-family: 'Poppins';
        background-image: linear-gradient(116.82deg, rgba(107, 158, 180, 0.6885) 0%, rgba(25, 73, 107, 0.4675) 74.39%);
    }
`;
export default GlobalStyles;
