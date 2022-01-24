import { useEffect, useState } from 'react';

export default function Route({ path, children }: { path: string; children: JSX.Element }) {
    const [currentPath, setCurrentPath] = useState(window.location.hash);

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.hash);
        };
        window.addEventListener('popstate', onLocationChange);
        return () => {
            window.removeEventListener('popstate', onLocationChange);
        };
    }, []);

    return currentPath === path ? children : null;
}
