import { useState, useEffect, useCallback, useRef } from 'react';
import { GlassEffect, OptionsContainer, SelectorContainer } from 'components/Selector/selector.style.ts';
import { SelectOption } from 'components/Selector/SelectOption.tsx';
import type { SelectorProps, SelectionOption, GlassEffectProps } from 'types/components/Selector';

export const Selector = ({
    label,
    options,
    defaultId,
    onChange,
    size,
    hideLabelOnMobile,
}: SelectorProps) => {
    const [selected, setSelected] = useState<SelectionOption>(() =>
        options.find(o => o.id === defaultId) ?? options[0]
    );
    const [glassProps, setGlassProps] = useState<GlassEffectProps>({ $left: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const glassRef = useRef<HTMLDivElement>(null);
    const handleSelect = useCallback((option: SelectionOption) => setSelected(option), [])

    const fixGlassPosition = useCallback((selected: SelectionOption) => {
        const container = containerRef.current as HTMLDivElement;
        if (!container) return;
        const containerRect = container.getBoundingClientRect();
        const activeElement = container.querySelector(`button[id="optionId-${selected.id}"]`) as HTMLButtonElement | null;
        if (!activeElement) return;
        const activeRect = activeElement.getBoundingClientRect();
        const glassProps = {
            $left: activeRect.x - containerRect.x,
            $width: activeRect.width,
            $height: activeRect.height,
        };
        console.log(selected, glassProps);
        setGlassProps(glassProps);

        const glassOverlay = glassRef.current;
        if (!glassOverlay) return;
        glassOverlay.animate(
            { transform: ['scaleY(1)', 'scaleY(.8)', 'scaleY(1)'], opacity: ['1', '0.9', '1'] },
            { duration: 512, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
        );
    }, []);

    useEffect(() => {
        if (typeof onChange === 'function') onChange(selected);
        /* invoke immediately but as microtask, so the onChange can act in the parent component before this is executed
        * Additionally it requests Animation Frame, to be sure all mutations of the DOM were finished, and <i>fixGlassPosition</i>
        * can work on updated DOM elements */
        setTimeout(() => requestAnimationFrame(() => { fixGlassPosition(selected); }));
    }, [selected]);

    return <SelectorContainer $size={size}>
        {label && <label className={hideLabelOnMobile ? 'hideOnMobile' : undefined}>{label}:</label>}
        <OptionsContainer ref={containerRef}>
            <GlassEffect ref={glassRef} {...glassProps} />
            {options.map(option => <SelectOption
                key={option.id}
                option={option}
                onSelect={handleSelect}
                selected={option.id === selected.id}
            />)}
        </OptionsContainer>
    </SelectorContainer>
};