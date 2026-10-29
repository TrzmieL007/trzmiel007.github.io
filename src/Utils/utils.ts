import type { CloneMapOptions } from 'types/utils.ts';

export const randomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const emailValidator = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

export const cloneMap = <Key, Value>(map?: Map<Key, Value>, options?: CloneMapOptions<Key, Value>): Map<Key, Value> => {
    const clonedMap = typeof map === 'undefined'
        ? new Map<Key, Value>()
        : new Map<Key, Value>(Array.from(map, ([key, value]) => [key, structuredClone(value)]));
    if (options?.insert)
        options.insert.forEach(([key, value]) => clonedMap.set(key, value));
    if (options?.remove)
        options.remove.forEach(key => clonedMap.delete(key));
    return clonedMap;
}
export const saveFileToHdd = (data: Blob | ArrayBuffer, fileName: string, type: string = 'application/octet-stream') => {
    const blob = data instanceof ArrayBuffer ? new Blob([new Uint8Array(data)], { type }) : data;
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
}
export const sha256Hash = async (data: ArrayBuffer): Promise<string> => {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(hashBuffer)]
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
export const getFileChecksum = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    return sha256Hash(arrayBuffer);
}

export const compareArrays = (a: Array<unknown>, b: Array<unknown>, haveSameOrder: boolean = false): boolean => {
    if (!a || !b || a.length !== b.length) return false;
    const a1 = [...a];
    const a2 = [...b];
    if (!haveSameOrder) {
        a1.sort();
        a2.sort();
    }
    return a1.every((e, i) => e === a2[i]);
};
export const calculateClassName = (...names: Array<string | undefined | null | false>): string | undefined =>
    names.filter((className: string | undefined | null | false): boolean => !!className).join(' ') || undefined;

export const debounce = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    foo: (...args: Array<any>) => void,
    timeout: number,
    thisArgument: unknown = undefined
): ((...args: Array<unknown>) => void) => {
    let timerId: number = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (...args: Array<any>): void => {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout((): void => foo.call(thisArgument, ...args), timeout) as unknown as number;
    };
};