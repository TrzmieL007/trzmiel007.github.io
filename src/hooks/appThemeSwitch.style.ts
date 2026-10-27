import { styled, css } from 'styled-components';
import type { SupportedTheme } from '../types';
import { lightTheme, darkTheme } from '../styles/theme.ts';

const lightThemeCss = css`
    background: ${lightTheme.colors.background};
    color: ${lightTheme.colors.text};
    border: ${lightTheme.border};
`;
const darkThemeCss = css`
    background: ${darkTheme.colors.background};
    color: ${darkTheme.colors.text};
    border: ${darkTheme.border};
`;
const systemCss = css`
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    border: ${({ theme }) => theme.border};
`;

const getStyleForTheme = (theme: SupportedTheme) => {
    switch (theme) {
        case 'dark': return darkThemeCss;
        case 'light': return lightThemeCss;
        default: return systemCss;
    }
}
const getBorderForTheme = (theme: SupportedTheme) => {
    switch (theme) {
        case 'dark': return css`${darkTheme.border};`;
        case 'light': return css`${lightTheme.border};`;
        default: return css`${lightTheme.border};`;
    }
}

export const AppThemeSwitch = styled.button<{ $themeKey: SupportedTheme }>`
    border-radius: 0;
    border: ${({ theme }) => theme.border};
    font: var(--font-xs);
    padding: 0 var(--spacing);
    line-height: 1.2rem;
    ${({ $themeKey }) => getStyleForTheme($themeKey)};
    &:first-child { border-radius: var(--border-radius) 0 0 var(--border-radius); }
    &:last-child { border-radius: 0 var(--border-radius) var(--border-radius) 0; }
    &:disabled {
        &:not(:first-child) { border-left: ${({ $themeKey }) => getBorderForTheme($themeKey)}; }
    }
    &:not(:last-child) { border-right: none; }
`;

export const AppThemeContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    header {
        font: var(--font-xs); 
        margin-right: var(--spacing);
    }
`;