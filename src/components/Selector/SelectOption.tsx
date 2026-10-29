import { memo } from 'react';
import { OptionElement } from 'components/Selector/selector.style.ts';
import type { SelectOptionProps } from 'types/components/Selector';

export const SelectOption = memo(({
    option,
    onSelect,
    selected
}: SelectOptionProps) =>
    <OptionElement
        onClick={() => onSelect(option)}
        id={`optionId-${option.id}`}
        data-id={option.id}
        className={selected ? 'active' : undefined}
    >
        {option.label}
    </OptionElement>);