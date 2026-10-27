import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import './styles/variables.css';
import GlobalStyle from './styles/globalStyles.ts';
import { ThemeContextProvider } from './styles/ThemeContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeContextProvider>
            <BrowserRouter>
                <GlobalStyle />
                <App />
            </BrowserRouter>
        </ThemeContextProvider>
    </StrictMode>,
);