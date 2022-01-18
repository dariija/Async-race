import React from 'react';

type Props = {
    className: string;
    path: string;
    pageNum: number;
    isPageActive: boolean;
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
};

export default function PageNavigationItem({ className, path, pageNum, isPageActive, setActivePage }: Props) {
    const changeActivePage = () => {
        setActivePage(pageNum);
    };

    return (
        <li className={`${className}__item`}>
            <a
                href={`#${path}#${pageNum}`}
                className={`${className}__link ${isPageActive ? `${className}__link_active` : ''}`}
                onClick={changeActivePage}
                aria-label={`#${path}#${pageNum}`}
            >
                <span />
            </a>
        </li>
    );
}
