import { styled, css } from 'styled-components';
import type { SupportedTheme, SystemTheme } from 'types';
import { OptionElement } from 'components/Selector/selector.style.ts';
import { lightTheme, darkTheme } from '../styles/theme.ts';
import { supportedThemes } from '/Providers/ThemeContextProvider.tsx';

const lightThemeCss = `
    background: ${lightTheme.colors.background};
    color: ${lightTheme.colors.text};
    border: ${lightTheme.border};
`;
const darkThemeCss = `
    background: ${darkTheme.colors.background};
    color: ${darkTheme.colors.text};
    border: ${darkTheme.border};
`;

const getStyleForTheme = (theme: SupportedTheme) => {
    switch (theme) {
        case 'dark': return darkThemeCss;
        case 'light': return lightThemeCss;
        default: return '';
    }
}
const getBorderForTheme = (theme: SupportedTheme) => {
    switch (theme) {
        case 'dark': return css`${darkTheme.border};`;
        case 'light': return css`${lightTheme.border};`;
        default: return '';
    }
}

export const AppThemeContainer = styled.div<{ $systemTheme: SystemTheme }>`
    ${supportedThemes.map((theme: SupportedTheme) => `
        ${OptionElement}[data-id="${theme}"] {
            ${getStyleForTheme(theme)}
            &.active:not(:nth-child(2)) { border-left: ${getBorderForTheme(theme)}; }
        }
    `).join('\n')}
    ${OptionElement}[data-id="system"] {
        ${({ $systemTheme }) => getStyleForTheme($systemTheme)}
        &.active:not(:nth-child(2)) { 
            border-left: ${({ $systemTheme }) => getBorderForTheme($systemTheme)};
        }
    }
`;