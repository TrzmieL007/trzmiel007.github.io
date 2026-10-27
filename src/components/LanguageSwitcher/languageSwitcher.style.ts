import { styled } from 'styled-components';

export const AppLanguageSwitch = styled.button`
    border-radius: 0;
    border: ${({ theme }) => theme.border};
    font: var(--font-xs);
    padding: 0 var(--spacing);
    line-height: 1.2rem;
    &:first-child { border-radius: var(--border-radius) 0 0 var(--border-radius); }
    &:last-child { border-radius: 0 var(--border-radius) var(--border-radius) 0; }
    &:disabled {
        &:not(:first-child) { border-left: ${({ theme }) => theme.border}; }
    }
    &:not(:last-child) { border-right: none; }
`;

export const AppLanguageContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    header {
        font: var(--font-xs); 
        margin-right: var(--spacing);
    }
`;