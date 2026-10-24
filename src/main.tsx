import { Suspense } from 'react';
import { Spinner } from 'components/Spinner';
import { createRoot } from 'react-dom/client';
import { isMobile } from 'react-device-detect';
import { Router } from 'src/Providers/Router.tsx';
import 'src/Styles/index.scss';
import './i18n';

const root = createRoot(document.getElementById('root') as HTMLElement);
if (isMobile) document.documentElement.classList.add('isMobile');

root.render(
    <Suspense fallback={<Spinner size="full-page" />}>
        {Router}
    </Suspense>
);
