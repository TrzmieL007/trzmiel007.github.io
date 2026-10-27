import type { LinkProps } from 'react-router';

export type SupportedLanguages = 'pl' | 'en';
export type SystemTheme = 'light' | 'dark';
export type SupportedTheme = SystemTheme | 'system';

export type LocalizedLinkProps = Omit<LinkProps, 'to'> & { to: string };