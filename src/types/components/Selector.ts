export interface SelectionOption {
    id: number | string;
    label: string;
    value: string | number;
    onSelect?: (value: SelectionOption) => void;
}

export interface SelectorProps {
    label?: string;
    options: Array<SelectionOption>;
    defaultId?: number | string;
    onChange?: (selected: SelectionOption) => void;
    size?: 'small' | 'medium';
    hideLabelOnMobile?: boolean;
}

export interface SelectOptionProps {
    option: SelectionOption;
    onSelect: (option: SelectionOption) => void;
    selected?: boolean;
}

export interface GlassEffectProps {
    $left: number;
    $width?: number;
    $height?: number;
}