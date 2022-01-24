import React from 'react';
import TWinnerTableData from '../../types/TWinnerTableData';
import TableData from './TableData';
import TableHeaderData from './TableHeaderData';

type Props = {
    winners: {
        winnersFullData: TWinnerTableData[];
        setWinnersFullData: React.Dispatch<React.SetStateAction<TWinnerTableData[]>>;
    };
    allWinners: {
        allWinnersQuantity: number;
        setAllWinnersQuantity: React.Dispatch<React.SetStateAction<number>>;
    };
    sortData: {
        sortBy: string;
        setSortBy: React.Dispatch<React.SetStateAction<string>>;
        sortType: string;
        setSortType: React.Dispatch<React.SetStateAction<string>>;
    };
    limitPerPage: number;
    activePage: number;
};

export default function WinnersTable({ winners, allWinners, sortData, limitPerPage, activePage }: Props) {
    return (
        <table className="winners-table">
            <caption className="winners-table__caption">Winners ({allWinners.allWinnersQuantity})</caption>
            <thead>
                <TableHeaderData sortData={sortData} />
            </thead>
            <tbody>
                {winners.winnersFullData.map((winner, index) => {
                    return (
                        <TableData
                            number={activePage * limitPerPage + index + 1 - limitPerPage}
                            colour={winner.color}
                            name={winner.name}
                            winsQuantity={winner.wins}
                            bestTime={winner.time}
                            key={index.toString()}
                        />
                    );
                })}
            </tbody>
        </table>
    );
}
