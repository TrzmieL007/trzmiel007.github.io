import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }
    
    html {
        font-family: Inter, system-ui, sans-serif;
        font-synthesis: none;
        text-rendering: optimizeLegibility;
    }
    
    body {
        margin: 0;
        min-width: 100vw;
        min-height: 100vh;
        background: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
    }
    
    button, input, textarea, select {
        font: inherit;
        &:disabled { cursor: default; }
    }
    
    button {
        cursor: pointer;
    }
    
    a {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
        &.active {
            cursor: default;
            color: var(--secondary-text-color);
        }
    }
    
    #root {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        justify-content: flex-start;
        align-items: stretch;
    }
`;

export default GlobalStyle;