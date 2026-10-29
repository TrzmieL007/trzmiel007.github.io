import { LocalizedLink } from '../components/LocalizedLink.tsx';

export const Menu = () => {
    return <menu>
        <LocalizedLink to="/" />
        <LocalizedLink to={'/aboutMyWork'} />
        <hr />
        iOS Apps
        <LocalizedLink to='/carFinder' />
    </menu>;
}