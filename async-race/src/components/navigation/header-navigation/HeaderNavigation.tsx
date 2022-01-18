import React from 'react';
import HeaderNavigationItem from './HeaderNavigationItem';

type Props = {
    pages: string[];
    pageStatus: {
        activePage: string;
        setActivePage: React.Dispatch<React.SetStateAction<string>>;
    };
};

export default function HeaderNavigation({ pages, pageStatus }: Props) {
    return (
        <nav className="nav">
            <ul className="nav__list">
                {pages.map((page, index) => (
                    <HeaderNavigationItem
                        className="nav"
                        path={page}
                        isPageActive={pageStatus.activePage === page}
                        setActivePage={pageStatus.setActivePage}
                        text={page}
                        key={index.toString()}
                    />
                ))}
            </ul>
        </nav>
    );
}
