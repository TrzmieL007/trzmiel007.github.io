import { styled } from 'styled-components';

export const NotFoundPage = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

export const NotFoundImage = styled.img`
    width: 100vw;
    height: 100vh;
    object-fit: contain;
    display: block;
`;

export const GoBackHomeButton = styled.div<{ $x: number, $y: number, $maxWidth: number }>`
    position: absolute;
    left: ${({ $x }) => `${$x}px`};
    top: ${({ $y }) => `${$y}px`};
    //transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.colors.accent};
    border-radius: calc((1.25rem + 2 * var(--padding-s)) / 2);
    max-width: ${({ $maxWidth }) => $maxWidth}px;
    a {
        padding: var(--padding-s) var(--padding-l);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: var(--spacing);
        div {
            color: var(--foreground-color-dark);
            font: var(--font-s-medium);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        img { display: block; }
    }
`;