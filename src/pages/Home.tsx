import { useTranslation } from 'react-i18next';
import { LoadHtmlDocument } from 'components/HTMLPresenter.tsx';

const countYears = () => {
    const yearsSpan = document.getElementById('years');
    const now = new Date();
    let years = now.getFullYear() - 1985;
    if (now.getMonth() > 5) ++years;
    if (yearsSpan) yearsSpan.innerHTML = years.toString();
}

export const Home = () => {
    const { t } = useTranslation();

    return <div>
        <h1>{t('home.title')} 🏠</h1>
        <LoadHtmlDocument document='homePage.html' onReady={countYears} />
    </div>;
}