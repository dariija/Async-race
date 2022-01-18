import React, { useState } from 'react';
import Button from '../../button/Button';
import PageNavigationItem from './PageNavigationItem';

type Props = {
    pagesQuantity: number;
    page: {
        activePage: number;
        setActivePage: React.Dispatch<React.SetStateAction<number>>;
    };
    path: string;
};

export default function PageNavigation({ pagesQuantity, page, path }: Props) {
    const goToPrevPage = () => {
        if (page.activePage > 1) page.setActivePage(page.activePage - 1);
    };

    const goToNextPage = () => {
        if (page.activePage < pagesQuantity) {
            page.setActivePage(page.activePage + 1);
        }
    };

    return (
        <nav className="page-nav">
            <Button className="prev" text="prev" handleClick={goToPrevPage} disabled={page.activePage === 1} />
            <ul className="pagination">
                {Array.from(Array(pagesQuantity).keys()).map((num, index) => (
                    <PageNavigationItem
                        className="pagination"
                        path={path}
                        pageNum={num + 1}
                        isPageActive={page.activePage === num + 1}
                        setActivePage={page.setActivePage}
                        key={index.toString()}
                    />
                ))}
            </ul>
            <Button
                className="next"
                text="next"
                handleClick={goToNextPage}
                disabled={page.activePage === pagesQuantity}
            />
        </nav>
    );
}
