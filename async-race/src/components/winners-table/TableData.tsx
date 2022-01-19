import React from 'react';

type Props = {
    number: number;
    // picture: JSX.Element;
    picture: string;
    name: string;
    winsQuantity: number;
    bestTime: number;
};

export default function TableData({ number, picture, name, winsQuantity, bestTime }: Props) {
    return (
        <tr>
            <td>{number}</td>
            <td>{picture}</td>
            <td>{name}</td>
            <td colSpan={2}>{winsQuantity}</td>
            <td colSpan={2}>{bestTime}</td>
        </tr>
    );
}
