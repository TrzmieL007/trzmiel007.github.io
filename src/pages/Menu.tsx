import { LocalizedLink } from '../components/LocalizedLink.tsx';

export const Menu = () => {
    return <menu>
        <LocalizedLink to="/" />
        <LocalizedLink to={'/aboutMyWork'} />
        iOS Apps
        <LocalizedLink to='/carFinder' />
    </menu>;
}