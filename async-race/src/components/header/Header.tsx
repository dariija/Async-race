import React from 'react';
import HeaderNavigation from '../navigation/header-navigation/HeaderNavigation';

type Props = {
    pages: string[];
    pageStatus: {
        activePage: string;
        setActivePage: React.Dispatch<React.SetStateAction<string>>;
    };
};

export default function Header({ pages, pageStatus }: Props) {
    return (
        <header className="header">
            <div className="container">
                <HeaderNavigation pages={pages} pageStatus={pageStatus} />
            </div>
        </header>
    );
}
