import { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router';
import { PageContainer, TopBar } from './languageLayout.style';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher.tsx';
import i18n from '../i18n.ts';
import { useAppTheme } from '../hooks/useAppTheme.tsx';
import { Menu } from '../pages/Menu.tsx';

export default function LanguageLayout() {
    const { lang } = useParams<{ lang: string }>();
    const { themeSwitcher } = useAppTheme();

    useEffect(() => {
        if (lang && i18n.language !== lang) {
            void i18n.changeLanguage(lang);
        }
    }, [lang]);

    if (lang !== 'pl' && lang !== 'en') {
        return <Navigate to="/pl/notFound" replace />;
    }

    return [
        <TopBar id="topBar" key="topBar">
            {themeSwitcher}
            <LanguageSwitcher />
        </TopBar>,
        <PageContainer key="pageContainer">
            <Menu />
            <main>
                <Outlet />
            </main>
        </PageContainer>
    ];
}