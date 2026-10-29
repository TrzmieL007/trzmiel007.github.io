import type { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
    colors: {
        background: 'var(--background-gradient)',
        surface: 'var(--card-background)',
        accent: 'var(--accent)',
        text: 'var(--text-color)',
        textSecondary: 'var(--secondary-text-color)',
        link: 'var(--link-color)',
        activeLik: 'var(--active-lik-color)',
        borderColor: 'var(--card-border)',
    },
    border: '1px solid var(--card-border)',
}

export const darkTheme: DefaultTheme = {
    colors: {
        background: 'var(--background-gradient-dark)',
        surface: 'var(--card-background-dark)',
        accent: 'var(--accent)',
        text: 'var(--text-color-dark)',
        textSecondary: 'var(--secondary-text-color-dark)',
        link: 'var(--link-color-dark)',
        activeLik: 'var(--active-lik-color-dark)',
        borderColor: 'var(--card-border-dark)',
    },
    border: '1px solid var(--card-border-dark)',
}