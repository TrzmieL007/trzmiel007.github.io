import { useContext } from 'react';
import { ThemeContext, supportedThemes } from '../Providers/ThemeContextProvider.tsx';
import { AppThemeContainer } from './appThemeSwitch.style.ts';
import { useTranslation } from 'react-i18next';
import { Selector } from 'components/Selector';
import type { SupportedTheme } from 'types';

export function useAppTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useAppTheme must be used within ThemeContextProvider');
    const { t } = useTranslation();

    const themeSwitcher = <AppThemeContainer $systemTheme={context.systemTheme}>
        <Selector
            options={supportedThemes.map((theme: SupportedTheme) => ({ id: theme, label: theme, value: theme }))}
            label={t('choseColorTheme')}
            onChange={val => context.setTheme(val.value as SupportedTheme)}
            defaultId={context.theme}
            size="small"
            hideLabelOnMobile
        />
    </AppThemeContainer>

    return { theme: context.theme, themeSwitcher };
}