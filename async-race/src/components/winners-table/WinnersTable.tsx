import React from 'react';
import TWinnerTableData from '../../types/TWinnerTableData';
import TableData from './TableData';
import TableHeaderData from './TableHeaderData';

type Props = {
    winners: {
        winnersFullData: TWinnerTableData[];
        setWinnersFullData: React.Dispatch<React.SetStateAction<TWinnerTableData[]>>;
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

export default function WinnersTable({ winners, sortData, limitPerPage, activePage }: Props) {
    return (
        <table className="winners-table">
            <caption>Winners</caption>
            <thead>
                <TableHeaderData sortData={sortData} />
            </thead>
            <tbody>
                {winners.winnersFullData.map((winner, index) => {
                    return (
                        <TableData
                            number={activePage * limitPerPage + index + 1 - limitPerPage}
                            picture={winner.color}
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
