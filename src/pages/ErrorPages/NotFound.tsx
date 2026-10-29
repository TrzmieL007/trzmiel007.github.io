import { useMemo, useRef, useState, useEffect } from 'react';
import { GoBackHomeButton, NotFoundImage, NotFoundPage } from '/pages/ErrorPages/notFound.style.ts';
import { useAppTheme } from '/hooks/useAppTheme.tsx';
import { LocalizedLink } from 'components/LocalizedLink.tsx';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { supportedLanguages } from '/i18n.ts';
import home from 'assets/home-icon.svg';
import A from 'assets/404-A.png';
import Ad from 'assets/404-Ad.png';
import B from 'assets/404-B.png';
import Bd from 'assets/404-Bd.png';
import C from 'assets/404-C.png';

interface FourOhFourDefinition {
    image: string;
    buttonX: number;    // a % value of the x axes position in the image
    buttonY: number;    // a % value of the y axes position in the image
    isDark?: boolean;
}
type Coordinates = { x: number; y: number; };
const images: Array<FourOhFourDefinition> = [
    { image: A, buttonX: 1110, buttonY: 570, isDark: false },
    { image: Ad, buttonX: 1100, buttonY: 700, isDark: true },
    { image: B, buttonX: 900, buttonY: 660, isDark: false },
    { image: Bd, buttonX: 930, buttonY: 670, isDark: true },
    { image: C, buttonX: 380, buttonY: 470 },
];

const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;

export default () => {
    const { t, i18n } = useTranslation();
    const { pathname } = useLocation();
    const { theme } = useAppTheme();
    const [coordinates, setCoordinates] = useState<Coordinates>({ x: 10, y: 10 });
    const [ language, setLanguage ] = useState<string>(i18n.language);
    const imgRef = useRef<HTMLImageElement>(null);

    const img = useMemo<FourOhFourDefinition>(() => {
        const useDark = theme === 'dark';
        const filteredImages = images.filter(image =>
            image.isDark === useDark || typeof image.isDark === 'undefined');
        const index = getRandomNumber(0, filteredImages.length);
        return filteredImages[index];
    }, [theme]);

    useEffect(() => {
        const image = imgRef.current;
        if (!image) return;

        const updateCoordinates = () => {
            const imgWidth = image.naturalWidth;
            const imgHeight = image.naturalHeight;
            if (!imgWidth || !imgHeight) return;
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;

            const scale = Math.min(winWidth / imgWidth, winHeight / imgHeight);
            const renderWidth = imgWidth * scale;
            const renderHeight = imgHeight * scale;

            const offsetX = (winWidth - renderWidth) / 2;
            const offsetY = (winHeight - renderHeight) / 2;

            setCoordinates({ x: img.buttonX * scale + offsetX, y: img.buttonY * scale + offsetY });
        }

        const observer = new ResizeObserver(updateCoordinates);
        observer.observe(document.body);

        image.addEventListener('load', updateCoordinates);

        return () => {
            observer.disconnect();
            image.removeEventListener('load', updateCoordinates);
        }
    }, []);

    useEffect(() => {
        const languageCode = pathname.replace(/^\/([a-z]{2})\/.*/i, '$1');
        if ((supportedLanguages as Array<string>).includes(languageCode) && languageCode !== language) {
            i18n.changeLanguage(languageCode);
            setLanguage(languageCode);
        } /*else if () {

        }*/
    }, [pathname]);

    return <NotFoundPage>
        <NotFoundImage src={img.image} ref={imgRef} />
        <GoBackHomeButton $x={coordinates.x} $y={coordinates.y} $maxWidth={window.innerWidth - coordinates.x}>
            <LocalizedLink to="/"><img src={home} /><div>{t('goBackHme')}</div></LocalizedLink>
        </GoBackHomeButton>
    </NotFoundPage>;
}