import React, { useState } from 'react';
import Button from '../button/Button';
import { TRacer, TRacersData } from '../../types/TRacersData';
import generateRandomName from '../../utils/generateRandomName';
import generateRandomColour from '../../utils/generateRandomColour';
import createRacerAPI from '../../utils/createRacerAPI';

type Props = {
    dataStatus: {
        dataChanged: boolean;
        setDataChanged: React.Dispatch<React.SetStateAction<boolean>>;
    };
};

export default function CreateRacer({ dataStatus }: Props) {
    const [newRacerName, setNewRacerName] = useState('');
    const changeName = ({ target }: { target: HTMLInputElement }) => {
        setNewRacerName(target.value);
    };

    const [newRacerColour, setNewRacerColour] = useState('#000000');
    const changeColour = ({ target }: { target: HTMLInputElement }) => {
        setNewRacerColour(target.value);
    };

    const createRacer = async () => {
        await createRacerAPI(newRacerName, newRacerColour);
        dataStatus.setDataChanged(true);
    };

    const generateRacers = async () => {
        const newRacersPromises: Promise<TRacer>[] = Array.from(Array(100)).map(() =>
            createRacerAPI(generateRandomName(), generateRandomColour())
        );
        await Promise.all(newRacersPromises);
        dataStatus.setDataChanged(true);
    };

    return (
        <div className="create">
            <input type="text" onChange={changeName} value={newRacerName} />
            <input type="color" onChange={changeColour} value={newRacerColour} />
            <Button className="button" text="Create" handleClick={createRacer} disabled={false} />
            <Button className="button" text="Generate" handleClick={generateRacers} disabled={false} />
        </div>
    );
}
