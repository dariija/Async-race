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
            <th>
                Wins
                <label className="checkbox-group" htmlFor="wins_sort">
                    <input className="checkbox-group__checkbox" type="checkbox" id="wins_sort" onChange={sortByWins} />
                    <span className="checkbox-group__arrow" />
                </label>
            </th>
            <th>
                Best time, s
                <label className="checkbox-group" htmlFor="time_sort">
                    <input
                        className="checkbox-group__checkbox"
                        type="checkbox"
                        id="time_sort"
                        onChange={sortByBestTime}
                    />
                    <span className="checkbox-group__arrow" />
                </label>
            </th>
        </tr>
    );
}
