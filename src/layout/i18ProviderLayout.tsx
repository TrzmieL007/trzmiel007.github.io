import { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router';
import { PageContainer, TopBar, TopBarSwitches, ShowMenuButton } from './languageLayout.style';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher.tsx';
import i18n from '../i18n.ts';
import { useAppTheme } from '../hooks/useAppTheme.tsx';
import { Menu } from '../pages/Menu.tsx';

export default function LanguageLayout() {
    const { lang } = useParams<{ lang: string }>();
    const { themeSwitcher } = useAppTheme()

    useEffect(() => {
        if (lang && i18n.language !== lang) {
            i18n.changeLanguage(lang).then(() => localStorage.setItem('lang', lang));
        }
    }, [lang]);

    if (lang !== 'pl' && lang !== 'en') {
        return <Navigate to="/en/notFound" replace />;
    }

    return [
        <TopBar id="topBar" key="topBar">
            <ShowMenuButton id="ShowMenuButton" />
            <TopBarSwitches>
                {themeSwitcher}
                <LanguageSwitcher />
            </TopBarSwitches>
        </TopBar>,
        <PageContainer key="pageContainer">
            <Menu />
            <main>
                <Outlet />
            </main>
        </PageContainer>
    ];
}