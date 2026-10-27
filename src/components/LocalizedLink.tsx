import { Link, useParams, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import type { LocalizedLinkProps } from '../types';

export const LocalizedLink: FC<LocalizedLinkProps> = ({
    to,
    ...props
}: LocalizedLinkProps) => {
    const { lang } = useParams<{ lang: string }>();
    const { pathname } = useLocation();
    const { t } = useTranslation();

    const path = to.startsWith('/') ? `/${lang ?? 'en'}${to}` : `${pathname}/${to}`;

    return <Link
        to={path}
        {...props}
        className={path === pathname ? `${props.className ?? ''} active` : props.className}
        children={props.children ?? t(`navigation.${path.replace(/\/[a-z]{2}(\/.*)/, '$1')}`)}
    />;
}