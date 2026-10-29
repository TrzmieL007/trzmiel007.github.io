import { css } from 'styled-components';

interface RGBcolor {
    r: number;
    g: number;
    b: number;
}
interface RGBAcolor extends RGBcolor {
    a: number;
}
const convertColorToNumber = (red: string, green: string, blue: string, alpha: string = 'FF'): RGBAcolor => ({
    r: parseInt(red, 16),
    g: parseInt(green, 16),
    b: parseInt(blue, 16),
    a: parseInt(alpha, 16) / 255,
});

export const isHexColor = (color: string): boolean => /^#([0-9A-F]{1,2}){3,4}$/i.test(color) && color.length !== 8 && color.length !== 6;
export const isRgbColor = (color: string): boolean => /^rgba?\((\d{1,3}%?([,\s])\s*){2}(\d{1,3}%?)(((,\s*)?|(\s+\/\s+))((1?\d{1,2}%)|(0?\.\d+)|1)?)\)$/i.test(color);

/** Parses string to RGBA colour object. The representation is in number from 0 to 255 */
export const parseColor = (color: string): RGBAcolor => {
    // Handle hex format (#RGB | #RGBA | #RRGGBB | #RRGGBBAA)
    if (isHexColor(color))
        switch(color.length - 1){
            case 3:
            case 4:
                // @ts-ignore
                return convertColorToNumber(...(color.slice(1).split('').map(char => `${char}${char}`)));
            case 6:
            case 8:
                // @ts-ignore
                return convertColorToNumber(...(color.slice(1).match(/.{1,2}/g)));
            default: throw new Error(`Invalid HEX color passed "${color}"`);
        }
    // Handle rgb() or rgba() format
    if (isRgbColor(color)) {
        if (color.match(/%/)) throw new Error('% values are not supported in rgb() / rgba() colors');
        const [r, g, b, a = 1] = (color.match(/\.?\d+/g) || []).map(Number);
        return { r, g, b, a };
    }

    throw new Error(`Unsupported color format "${color}"`);
};

/** Gets colours luminance, used to determine if the colour is either light or dark in scale from 0 to 1 */
export const getLuminance = ({ r, g, b }: RGBcolor): number => {
    const [rNorm, gNorm, bNorm] = [r, g, b].map((c) => {
        const channel = c / 255;
        return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rNorm + 0.7152 * gNorm + 0.0722 * bNorm;
};

/** Returns better fitting contrast color.
 * You provide a main color, and two (light & dark) colours,
 * this function will return dark colour if the main color is above .5 Luminance, and light colour otherwise. */
export const getBetterContrastColor = (color: string, light: string, dark: string): string => getLuminance(parseColor(color)) > .5 ? dark : light;

/** Creates a transition of length time (always ms), of all provided properties in following arguments */
export const transition = (time: number, ...properties: Array<string>): string => {
    return `transition: ${properties.map(property => `${property} ${time}ms`).join(', ')};`;
}

export type EasingFunction = 'linear' | 'ease' | 'ease-in-out' | 'ease-in' | 'ease-out' | `cubic-bezier(${number}, ${number}, ${number}, ${number})`;
export type TransitionTuple = [string, number, EasingFunction?, number?];
/** Generates custom transitions
 * Each tuple contains [propertyName: string, duration: number, easingFunction: EasingFunction, delay: number]
 * This way each property might have its own config. The duration and delay have to be in ms.
 **/
export const getTransitions = (...props: Array<TransitionTuple>): string =>
    `transition: ${props.map(([property, durationMs, easing, delayMs]) => `${property} ${durationMs}ms${easing ? ` ${easing}` : ''}${delayMs ? ` ${delayMs}ms` : ''}`).join(', ')};`;

export const rem = (value: number): string => (value ? `${value / 16}rem` : '0');

export const Breakpoints = {
    PHONE: 600,
    TABLET: 900,
    DESKTOP: 1200,
};
export type Breakpoints = (typeof Breakpoints)[keyof typeof Breakpoints];
export const ScreenDensity = {
    SINGLE: 72,
    DOUBLE: 150,
    TRIPLE: 300,
}
export type ScreenDensity = (typeof ScreenDensity)[keyof typeof ScreenDensity];
interface MediaQueryOptions {
    breakpoint?: Breakpoints;
    screenDensity?: ScreenDensity;
    landscape?: boolean;
}
export const mediaQuery = (mediaQueries: MediaQueryOptions | Breakpoints) => {
    const media: Array<string> = ['only screen'];
    if (typeof mediaQueries === 'number') media.push(`(max-width: ${mediaQueries}px)`);
    else {
        if (mediaQueries.breakpoint) media.push(`(max-width: ${mediaQueries.breakpoint}px)`);
        if (mediaQueries.screenDensity) media.push(`(min-resolution: ${mediaQueries.screenDensity}dpi)`);
        if (typeof mediaQueries.landscape === 'boolean' && mediaQueries.landscape) media.push(`(max-aspect-ratio: 1/1)`);
    }

    // @ts-ignore
    return styles => css`@media ${media.join(' and ')} { ${styles} }`;
}