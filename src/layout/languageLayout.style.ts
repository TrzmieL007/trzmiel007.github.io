import { styled } from 'styled-components';
import { mediaQuery, Breakpoints, transition } from '/Utils/styledComponents.ts';

export const TopBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-xl);
    padding: var(--padding-xs);
    border-bottom: ${({ theme }) => theme.border};
    header { ${mediaQuery(Breakpoints.PHONE)`display: none;`} }
`;

export const TopBarSwitches = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-xl);
`;

export const ShowMenuButton = styled.div`
    width: 2rem;
    height: 2rem;
    border: ${({ theme }) => theme.border};
    visibility: hidden;
    ${mediaQuery(Breakpoints.PHONE)`visibility: visible;`}
    flex-shrink: 0;
    svg {
        width: calc(2rem - 2px);
        height: calc(2rem - 2px);
    }
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
        flex-shrink: 0;
        align-items: stretch;
        gap: var(--spacing-s);
        border: ${({ theme }) => theme.border};
        border-style: none solid none none;
        border-color: ${({ theme }) => theme.colors.borderColor};
        background-color: ${({ theme }) => theme.colors.surface};
        ${transition(512, 'left')};
        ${mediaQuery(Breakpoints.PHONE)`
            left: 0;
            position: absolute;
            border-style: none solid solid none;
        `}
        a { padding-bottom: .5rem; }
        hr {
            border: none;
            border-top: 1px solid ${({ theme }) => theme.colors.textSecondary};
            width: 100%;
        }
        &:not(.open) { ${mediaQuery(Breakpoints.PHONE)`left: -12.1rem;`} }
    }
    main {
        margin-left: var(--spacing);
        ${mediaQuery(Breakpoints.PHONE)`margin-left: 0;`}
    }
`;
