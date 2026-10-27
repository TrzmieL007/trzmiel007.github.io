import {
    createContext,
    useEffect,
    useState,
    type ReactNode, useCallback,
} from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import type { SupportedTheme, SystemTheme } from '../types';
import type { DefaultTheme } from 'styled-components/dist/models/ThemeProvider';

const LocalStorageThemeKey = 'theme';
interface ThemeContextProviderPros { children: ReactNode; }
type Theme = { key: SupportedTheme; value: DefaultTheme };
type ThemeContextValue = {
    theme: SupportedTheme;
    setTheme: (mode: SupportedTheme) => void;
};

const themeMap: Map<SupportedTheme, DefaultTheme | undefined> = new Map<SupportedTheme, DefaultTheme | undefined>([
    ['light', lightTheme],
    ['system', undefined],
    ['dark', darkTheme],
]);
export const supportedThemes: Array<SupportedTheme> = Array.from(themeMap.keys());

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(matches?: Boolean): SystemTheme {
    return matches ?? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeContextProvider({ children }: ThemeContextProviderPros) {
    const [systemTheme, setSystemTheme] = useState<SystemTheme>(getSystemTheme);
    const [theme, setTheme] = useState<Theme>(() => {
        const key = (localStorage.getItem(LocalStorageThemeKey) ?? 'system') as SupportedTheme;
        return { key, value: themeMap.get(key) ?? themeMap.get(systemTheme) ?? lightTheme };
    });

    const switchTheme = useCallback((themeKey: SupportedTheme) => {
        const theme = themeMap.get(themeKey) ?? themeMap.get(systemTheme) ?? lightTheme;
        setTheme({ key: themeKey, value: theme });
        localStorage.setItem(LocalStorageThemeKey, themeKey);
    }, []);

    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const update = (event: MediaQueryListEvent) => {
            setSystemTheme(getSystemTheme(event.matches));
        }
        setSystemTheme(getSystemTheme(media.matches));
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        document.documentElement.style.colorScheme = theme.key;
    }, [theme.key]);

    const themeValue: DefaultTheme = theme.key === 'system'
        ? themeMap.get(systemTheme) ?? lightTheme
        : theme.value;

    return <ThemeContext.Provider value={{ theme: theme.key, setTheme: switchTheme }}>
        <ThemeProvider theme={themeValue}>{children}</ThemeProvider>
    </ThemeContext.Provider>;
}