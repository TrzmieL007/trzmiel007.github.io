import { useLocation, useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../../i18n.ts';
import type { SupportedLanguages } from '../../types';
import { AppLanguageContainer, AppLanguageSwitch } from './languageSwitcher.style.ts';

const LanguageSwitcher = () => {
    const { lang } = useParams<{ lang: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();

    function changeLanguage(nextLang: SupportedLanguages) {
        if (nextLang === lang) return;

        const segments = location.pathname.split('/');
        segments[1] = nextLang;

        navigate(segments.join('/') || `/${nextLang}`);
    }

    return <AppLanguageContainer>
        <header>{t('lang.choseLanguage')}:</header>
        <div>
            {supportedLanguages.map((language: SupportedLanguages) =>
                <AppLanguageSwitch
                    type="button"
                    onClick={() => changeLanguage(language)}
                    disabled={language === lang}
                    key={language}
                >{t(`lang.${language}`)}</AppLanguageSwitch>
            )}
        </div>
    </AppLanguageContainer>;
}

export default LanguageSwitcher;