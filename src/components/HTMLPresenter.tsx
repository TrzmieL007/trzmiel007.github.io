import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

type Props = {
    document: string;
    onReady?: () => void;
}

export const LoadHtmlDocument = ({ document, onReady }: Props)=> {
    const { t, i18n } = useTranslation();
    const [html, setHtml] = useState<string | null>(null);
    const lang = i18n.language;

    useEffect(() => {
        let cancelled = false;
        let documentURL = `/content/${lang}/${document.replace(/^\//, '')}`;
        async function loadDocument() {
            setHtml(null);
            try {
                const response = await fetch(documentURL);
                if (!response.ok) {
                    throw new Error(`Failed to load document: ${response.status}`);
                }
                const source = await response.text();
                const sanitized = DOMPurify.sanitize(source);

                if (!cancelled) { setHtml(sanitized); }
            } catch (error) {
                if (!cancelled) {
                    console.error(error);
                    setHtml('');
                }
            }
        }

        void loadDocument();

        return () => { cancelled = true; }
    }, [document, lang]);

    useEffect(() => {
        if (html && typeof onReady === 'function') onReady();
    }, [html]);

    if (html === null) {  return <p>{t('common.loading')}</p>; }
    if (!html) { return <p>{t('canNotLoadContent')}</p>; }

    return parse(html);
}