import { useContext } from 'react';
import { ThemeContext, supportedThemes } from '../styles/ThemeContextProvider.tsx';
import type { SupportedTheme, SystemTheme } from '../types';
import { AppThemeContainer, AppThemeSwitch } from './appThemeSwitch.style.ts';
import { useTranslation } from 'react-i18next';

export function useAppTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useAppTheme must be used within ThemeContextProvider');
    const { t } = useTranslation();

    const themeSwitcher = <AppThemeContainer>
        <header>{t('choseColorTheme')}:</header>
        <div>
            {supportedThemes.map((theme: SupportedTheme) =>
                <AppThemeSwitch
                    onClick={() => context.setTheme(theme)}
                    disabled={context.theme === theme}
                    $themeKey={theme as SystemTheme}
                    key={theme}
                >
                    {theme}
                </AppThemeSwitch>
            )}
        </div>
    </AppThemeContainer>;

    return { theme: context.theme, themeSwitcher };
}