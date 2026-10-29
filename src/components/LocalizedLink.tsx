import { Link, useParams, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import type { LocalizedLinkProps } from 'types';

const prepareTranslationKey = (path: string): string => {
    let key = path.replace(/\/[a-z]{2}(\/.*)/, '$1');
    key = key.replace(/\/{2,}/g, '/');
    return `navigation.${key}`;
}

export const LocalizedLink: FC<LocalizedLinkProps> = ({
    to,
    ...props
}: LocalizedLinkProps) => {
    const { lang } = useParams<{ lang: string }>();
    const { pathname } = useLocation();
    const { t } = useTranslation();

    const path = to.startsWith('/') ? `/${lang ?? 'en'}${to}` : `${pathname.replace(/\/$/, '')}/${to}`;

    return <Link
        to={path}
        {...props}
        className={path === pathname ? `${props.className ?? ''} active` : props.className}
        children={props.children ?? t(prepareTranslationKey(path))}
    />;
}