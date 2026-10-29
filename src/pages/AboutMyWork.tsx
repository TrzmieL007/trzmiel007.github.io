import { LoadHtmlDocument } from 'components/HTMLPresenter.tsx';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';

const AboutMyWorkStyledWrapper = styled.div`
    section { margin: var(--spacing-xl) 0; }
    ul {
        list-style: "-";
        li { padding-left: var(--spacing); }
        margin: var(--spacing) 0;
    }
    ol {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: var(--padding-xl);
        li {
            display: flex;
            gap: var(--spacing-xl);
            align-items: center;
            strong {
                display: inline-block;
                font: var(--font-m-black);
                &::first-letter { font-size: 1.2rem; }
            }
            img {
                width: 4rem;
                height: 4rem;
                object-fit: contain;
            }
        }
    }
`;

export default () => {
    const { t } = useTranslation();

    return <AboutMyWorkStyledWrapper>
        <h1>{t('whatIdo.title')}</h1>
        <LoadHtmlDocument document='aboutMyWork.html' />
    </AboutMyWorkStyledWrapper>;
}