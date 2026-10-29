import { LocalizedLink } from 'components/LocalizedLink.tsx';
import { Portal } from 'components/Portal';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import HamburgerMenu from 'assets/menu.svg?react'

export const Menu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLMenuElement>(null);
    const { pathname } = useLocation();

    const toggleMenu = useCallback(() => setShowMenu(prev => !prev), []);
    const closeCallback = useCallback((e: MouseEvent): void => {
        const menuElement = menuRef.current;
        if (menuElement && !menuElement.contains(e.target as Node)) {
            setShowMenu(false);
        }
    }, []);

    useEffect(() => {
        requestAnimationFrame(() => {
            if (showMenu) document.addEventListener('click', closeCallback, { passive: true });
        });
        return () =>  document.removeEventListener('click', closeCallback);
    }, [showMenu]);
    useEffect(() => setShowMenu(false), [pathname]);

    return <menu ref={menuRef} className={showMenu ? "open" : undefined}>
        <Portal doNotFallbackToBody hostSelector="#ShowMenuButton">
            <HamburgerMenu onClick={toggleMenu} />
        </Portal>
        <LocalizedLink to="/" />
        <LocalizedLink to={'/aboutMyWork'} />
        <hr />
        iOS Apps
        <LocalizedLink to='/carFinder' />
    </menu>;
}