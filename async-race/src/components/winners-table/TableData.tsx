import React from 'react';
import RacerPicture from '../picture/RacerPicture';

type Props = {
    number: number;
    colour: string;
    name: string;
    winsQuantity: number;
    bestTime: number;
};

export default function TableData({ number, colour, name, winsQuantity, bestTime }: Props) {
    return (
        <tr>
            <td>{number}</td>
            <td>
                <RacerPicture colour={colour} className="racer__svg_winners " />
            </td>
            <td>{name}</td>
            <td>{winsQuantity}</td>
            <td>{bestTime}</td>
        </tr>
    );
}
