import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            background: string;
            accent: string;
            text: string;
            textSecondary: string;
            link: string;
            activeLik: string;
        };
        border: string;
    }
};