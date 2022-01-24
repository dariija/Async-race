import React from 'react';

type Props = {
    className: string;
    path: string;
    isPageActive: boolean;
    setActivePage: React.Dispatch<React.SetStateAction<string>>;
    text: string;
};

export default function HeaderNavigationItem({ className, path, isPageActive, setActivePage, text }: Props) {
    const changeActivePage = () => {
        setActivePage(path);
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    return (
        <li className={`${className}__item`}>
            <a
                href={`#${path}`}
                className={`${className}__link ${isPageActive ? `${className}__link_active` : ''}`}
                onClick={changeActivePage}
            >
                {text}
            </a>
        </li>
    );
}
