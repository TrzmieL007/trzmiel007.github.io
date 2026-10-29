import { styled } from 'styled-components';
import { getTransitions, mediaQuery, Breakpoints } from '/Utils/styledComponents.ts';
import type { GlassEffectProps } from 'types/components/Selector.ts';

export const OptionsContainer = styled.div`position: relative;`;

export const OptionElement = styled.button`
    border-radius: 0;
    border: ${({ theme }) => theme.border};
    &:nth-child(2) { border-radius: var(--border-radius) 0 0 var(--border-radius); }
    &:last-child { border-radius: 0 var(--border-radius) var(--border-radius) 0; }
    &:not(:last-child) { border-right: none; }
`;

export const GlassEffect = styled.div<GlassEffectProps>`
    --local-spacing: var(--spacing-s);
    position: absolute;
    isolation: isolate;
    z-index: 10;
    left: ${({ $left }) => `calc(${$left}px - var(--local-spacing));`};
    width: ${({ $width }) => 
            $width ? `calc(${$width}px + var(--local-spacing) * 2)` : 0};
    height: ${({ $height }) =>
            $height ? `calc(${$height}px + var(--local-spacing) * 2)` : 0};
    border-radius: calc(var(--border-radius) + var(--local-spacing));
    ${getTransitions(
        ['left', 512, 'cubic-bezier(0.22, 1, 0.36, 1)', 64],
        ['width', 512, 'cubic-bezier(0.22, 1, 0.36, 1)', 128],
        ['height', 512, 'cubic-bezier(0.22, 1, 0.36, 1)', 128]
    )};
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(.5px) saturate(180%);
    box-shadow:
            0 8px 16px rgba(0, 0, 0, 0.15),
            inset 0 1px 1px rgba(255, 255, 255, 0.5),
            inset 0 -1px 1px rgba(255, 255, 255, 0.1);
    &::before {
        content: "";
        position: absolute;
        inset: 0 1px 1px;
        box-shadow: rgba(255, 255, 255, 0.5) 1px 2px 2px inset, rgba(255, 255, 255, 0.1) -2px -1px 2px inset;
        border-radius: inherit;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
        isolation: isolate;
    }
    @media (prefers-reduced-motion: reduce) {
        &, &:before { animation: none; }
    }
`;

export const SelectorContainer = styled.div<{ $size?: 'small' | 'medium' }>`
    --local-size: var(--spacing-${({ $size }) => $size === 'small' ? 'xs' : 's'});
    --local-font: var(--font-${({ $size }) => $size === 'small' ? 'xs' : 'm'});
    --local-option-padding: ${({ $size }) => $size === 'small' 
            ? '0 var(--spacing)'
            : 'var(--spacing-xs) var(--padding)'};
    ${OptionsContainer} {
        margin: calc(var(--local-size) * ${({ $size }) => $size === 'small' ? '1' : '2'});
        ${GlassEffect} { --local-spacing: var(--local-size); }
        ${OptionElement} {
            padding: var(--local-option-padding);
            font: var(--local-font);
            ${({ $size }) => $size === 'small' && 'line-height: 1.2rem;'}
        }
    }
    &, ${OptionsContainer} {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    label {
        font: var(--local-font);
        font-size: 500;
        margin-right: var(--spacing);
    }
    ${mediaQuery(Breakpoints.TABLET)`flex-direction: column;`}
    ${mediaQuery(Breakpoints.PHONE)`label.hideOnMobile { display: none; }`}
`;