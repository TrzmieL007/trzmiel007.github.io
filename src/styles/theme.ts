import type { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
    colors: {
        background: 'var(--background-gradient)',
        accent: 'var(--accent)',
        text: 'var(--text-color)',
        textSecondary: 'var(--secondary-text-color)',
        link: 'var(--link-color)',
        activeLik: 'var(--active-lik-color)',
    },
    border: '1px solid var(--card-border)',
}

export const darkTheme: DefaultTheme = {
    colors: {
        background: 'var(--background-gradient-dark)',
        accent: 'var(--accent)',
        text: 'var(--text-color-dark)',
        textSecondary: 'var(--secondary-text-color-dark)',
        link: 'var(--link-color-dark)',
        activeLik: 'var(--active-lik-color-dark)',
    },
    border: '1px solid var(--card-border-dark)',
}