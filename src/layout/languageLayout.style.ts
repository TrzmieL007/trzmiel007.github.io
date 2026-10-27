import { styled } from 'styled-components';

export const TopBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-xl);
    padding: var(--padding-xs);
    border-bottom: ${({ theme }) => theme.border};
`;

export const PageContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
    flex-grow: 1;
    menu, main {
        overflow-y: auto;
        padding: var(--spacing);
        margin: 0;
    }
    menu {
        flex-basis: 12rem;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        border-right: ${({ theme }) => theme.border};
    }
    main { margin-left: var(--spacing); }
`;