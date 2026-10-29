import { useTranslation, Trans } from 'react-i18next';
import { LocalizedLink } from 'components/LocalizedLink.tsx';

export const CarFinder = () => {
    const { t } = useTranslation();

    return <div>
        <h1>{t('carFinder.title')}</h1>
        <p>
            <Trans
                i18nKey='carFinder.supportLink'
                components={{ link: <LocalizedLink to='support'/> }}
            />
        </p>
        <p>
            <Trans
                i18nKey='carFinder.privacyPolicyLink'
                components={{ link: <LocalizedLink to='privacyPolicy'/> }}
            />
        </p>
    </div>;
}