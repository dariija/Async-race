import React, { useEffect, useState } from 'react';
import { TRacer, TRacersData } from '../../../types/TRacersData';
import TWinner from '../../../types/TWinner';
import TWinnerTableData from '../../../types/TWinnerTableData';
import getRacerAPI from '../../../utils/getRacerAPI';
import getWinnersAPI from '../../../utils/getWinnersAPI';
import PageNavigation from '../../navigation/page-navigation/PageNavigation';
import WinnersTable from '../../winners-table/WinnersTable';

export default function MainWinners() {
    const limitPerPage = 10;
    const [pagesQuantity, setPagesQuantity] = useState(1);
    const [activeContentPage, setActiveContentPage] = useState(1);

    const [allWinnersQuantity, setAllWinnersQuantity] = useState(0);
    const [winnersData, setWinnersData] = useState<TWinner[]>([]);
    const [winnersFullData, setWinnersFullData] = useState<TWinnerTableData[]>([]);

    const [sortBy, setSortBy] = useState('id');
    const [sortType, setSortType] = useState('ASC');

    useEffect(() => {
        (async () => {
            const getWinners = await getWinnersAPI(1, limitPerPage);
            setPagesQuantity(Math.ceil(getWinners.allWinners / limitPerPage));
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const getWinners = await getWinnersAPI(activeContentPage, limitPerPage, sortBy, sortType);
            setAllWinnersQuantity(getWinners.allWinners);
            setWinnersData(getWinners.winnersPerPage);
        })();
    }, [activeContentPage, sortBy, sortType]);

    useEffect(() => {
        (async () => {
            const fullDataPromises = winnersData.map(async (winner) => {
                const racerData: TRacer = await getRacerAPI(winner.id);
                const winnerFullData: TWinnerTableData = Object.assign(winner, racerData);
                return winnerFullData;
            });
            const fullData = await Promise.all(fullDataPromises);
            setWinnersFullData(fullData);
        })();
    }, [winnersData]);

    return (
        <main className="winners">
            <div className="winners-table__wrapper">
                <WinnersTable
                    winners={{ winnersFullData, setWinnersFullData }}
                    allWinners={{ allWinnersQuantity, setAllWinnersQuantity }}
                    sortData={{ sortBy, setSortBy, sortType, setSortType }}
                    limitPerPage={limitPerPage}
                    activePage={activeContentPage}
                />
                <PageNavigation
                    pagesQuantity={pagesQuantity}
                    page={{ activeContentPage, setActiveContentPage }}
                    path="winners"
                />
            </div>
        </main>
    );
}
