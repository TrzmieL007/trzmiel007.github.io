import { useEffect, useState, type FC, type ReactElement } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactElement | Array<ReactElement>;
    hostSelector?: string;
    hostElement?: HTMLElement;
    doNotFallbackToBody?: boolean;
}

export type PortalElement = FC<PortalProps>;

export const Portal: PortalElement = ({ children, hostSelector, hostElement, doNotFallbackToBody = false }: PortalProps) => {
    const [node, setNode] = useState<HTMLDivElement | null>(null);
    const [host, setHost] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const div = document.createElement('div');
        const host = getHost(hostElement, hostSelector);
        host.appendChild(div);
        setNode(div);
        setHost(host);

        return () => {
            setNode(null);
            host.removeChild(div);
        };
    }, []);

    if (doNotFallbackToBody && host === document.body) return <>{children}</>;

    return node && createPortal(<>{children}</>, node);
};

function getHost(hostElement: HTMLElement | void, hostSelector: string = '', defaultElement: HTMLElement = document.body): HTMLElement {
    if (hostElement) return getHost(undefined, hostSelector, hostElement);
    if (hostSelector) {
        const selectedElement = defaultElement.querySelector(hostSelector) as HTMLElement | null;
        if (selectedElement) return selectedElement;
    }

    return defaultElement;
}
