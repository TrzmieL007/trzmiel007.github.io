import { useLocation, useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '/i18n.ts';
import type { SupportedLanguages } from 'types';
import { Selector } from 'components/Selector';

const LanguageSwitcher = () => {
    const { lang } = useParams<{ lang: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const changeLanguage = (nextLang: SupportedLanguages)=> {
        if (nextLang === lang) return;

        const segments = location.pathname.split('/');
        segments[1] = nextLang;

        navigate(segments.join('/') || `/${nextLang}`);
    };

    return <Selector
        options={supportedLanguages.map((language: SupportedLanguages) => ({
                id: language, label: t(`lang.${language}`), value: language
            })
        )}
        onChange={language => changeLanguage(language.value as SupportedLanguages)}
        label={t('lang.choseLanguage')}
        defaultId={lang}
        size="small"
        hideLabelOnMobile
    />
}

export default LanguageSwitcher;