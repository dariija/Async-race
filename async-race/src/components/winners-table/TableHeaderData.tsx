import React from 'react';

type Props = {
    sortData: {
        sortBy: string;
        setSortBy: React.Dispatch<React.SetStateAction<string>>;
        sortType: string;
        setSortType: React.Dispatch<React.SetStateAction<string>>;
    };
};

export default function TableHeaderData({ sortData }: Props) {
    const sortByWins = ({ target }: { target: HTMLInputElement }) => {
        sortData.setSortBy('wins');
        if (target.checked) {
            sortData.setSortType('ASC');
        } else {
            sortData.setSortType('DESC');
        }
    };

    const sortByBestTime = ({ target }: { target: HTMLInputElement }) => {
        sortData.setSortBy('time');
        if (target.checked) {
            sortData.setSortType('ASC');
        } else {
            sortData.setSortType('DESC');
        }
    };

    return (
        <tr>
            <th>№</th>
            <th>Image</th>
            <th>Name</th>
            <th>Wins</th>
            <th>
                <label>
                    <input type="checkbox" onChange={sortByWins} />
                    <span />
                </label>
            </th>
            <th>Best time, s</th>
            <th>
                <label>
                    <input type="checkbox" onChange={sortByBestTime} />
                    <span />
                </label>
            </th>
        </tr>
    );
}
