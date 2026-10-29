import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            background: string;
            surface: string;
            accent: string;
            text: string;
            textSecondary: string;
            link: string;
            activeLik: string;
            borderColor: string;
        };
        border: string;
    }
};