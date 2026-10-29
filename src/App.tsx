import { Navigate, Route, Routes } from 'react-router';
import { Home } from '/pages/Home';
import { CarFinder, CarFinderPrivacyPolicy, CarFinderSupport } from '/pages/CarFinder';
import AboutMyWork from '/pages/AboutMyWork';
import NotFound from '/pages/ErrorPages/NotFound';
import LanguageProvider from '/layout/i18ProviderLayout.tsx';

export default () => {

    return <Routes>
        <Route path="/" element={<Navigate to="/pl" replace />} />

        <Route path="/:lang" element={<LanguageProvider />}>
            <Route index element={<Home />} />

            <Route path="carFinder" element={<CarFinder />} />
            <Route path="carFinder/support" element={<CarFinderSupport />} />
            <Route path="carFinder/privacyPolicy" element={<CarFinderPrivacyPolicy />} />

            <Route path="aboutMyWork" element={<AboutMyWork />} />
        </Route>
        <Route path="*" element={<NotFound />} />
    </Routes>;
}