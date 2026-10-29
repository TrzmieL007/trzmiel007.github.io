import { LoadHtmlDocument } from 'components/HTMLPresenter.tsx';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { mediaQuery, Breakpoints } from '/Utils/styledComponents.ts';

const AboutMyWorkStyledWrapper = styled.div`
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
                //font: var(--font-m-black);
                &::first-letter { font-size: 1.2rem; }
            }
            img {
                width: 4rem;
                height: 4rem;
                object-fit: contain;
            }
        }
        ${mediaQuery(Breakpoints.PHONE)`
            padding-left: 0;
            li {
                flex-direction: column;
                img {
                    width: calc(100vw - var(--spacing) * 2);
                    height: 6rem;
                }
            }
        `}
    }
`;

export default () => {
    const { t } = useTranslation();

    return <AboutMyWorkStyledWrapper>
        <h1>{t('whatIdo.title')}</h1>
        <LoadHtmlDocument document='aboutMyWork.html' />
    </AboutMyWorkStyledWrapper>;
}