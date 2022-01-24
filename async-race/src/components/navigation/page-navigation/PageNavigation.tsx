import React from 'react';
import Button from '../../button/Button';
import PageNavigationItem from './PageNavigationItem';

type Props = {
    pagesQuantity: number;
    page: {
        activeContentPage: number;
        setActiveContentPage: React.Dispatch<React.SetStateAction<number>>;
    };
    path: string;
};

export default function PageNavigation({ pagesQuantity, page, path }: Props) {
    const goToPrevPage = () => {
        if (page.activeContentPage > 1) page.setActiveContentPage(page.activeContentPage - 1);
    };

    const goToNextPage = () => {
        if (page.activeContentPage < pagesQuantity) page.setActiveContentPage(page.activeContentPage + 1);
    };

    return (
        <nav className="page-nav__nav">
            <Button className="button button_prev" handleClick={goToPrevPage} disabled={page.activeContentPage === 1}>
                <>
                    <span className="arr-left arr-left_top-part" />
                    <span className="arr-left arr-left_bottom-part" />
                </>
            </Button>
            <ul className="pagination">
                {Array.from(Array(pagesQuantity).keys()).map((num, index) => (
                    <PageNavigationItem
                        className="pagination"
                        path={path}
                        pageNum={num + 1}
                        isPageActive={page.activeContentPage === num + 1}
                        setActivePage={page.setActiveContentPage}
                        key={index.toString()}
                    />
                ))}
            </ul>
            <Button
                className="button button_next"
                handleClick={goToNextPage}
                disabled={page.activeContentPage === pagesQuantity}
            >
                <>
                    <span className="arr-right arr-right_top-part" />
                    <span className="arr-right arr-right_bottom-part" />
                </>
            </Button>
        </nav>
    );
}
