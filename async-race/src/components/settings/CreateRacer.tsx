import React, { useState } from 'react';
import Button from '../button/Button';
import { TRacer, TRacersData } from '../../types/TRacersData';
import generateRandomName from '../../utils/generateRandomName';
import generateRandomColour from '../../utils/generateRandomColour';
import createRacerAPI from '../../utils/createRacerAPI';

type Props = {
    racersData: {
        racers: TRacersData;
        setRacers: React.Dispatch<React.SetStateAction<TRacersData>>;
    };
    racersOnPageData: {
        racersOnPage: TRacersData;
        setRacersOnPage: React.Dispatch<React.SetStateAction<TRacersData>>;
    };
    limitPerPage: number;
};

export default function CreateRacer({ racersData, racersOnPageData, limitPerPage }: Props) {
    const [newRacerName, setNewRacerName] = useState('');
    const changeName = ({ target }: { target: HTMLInputElement }) => {
        setNewRacerName(target.value);
    };

    const [newRacerColour, setNewRacerColour] = useState('#000000');
    const changeColour = ({ target }: { target: HTMLInputElement }) => {
        setNewRacerColour(target.value);
    };

    const createRacer = async () => {
        const newRacer = await createRacerAPI(newRacerName, newRacerColour);
        const newRacerItem = { name: newRacerName, color: newRacerColour, id: newRacer.id };
        racersData.setRacers([...racersData.racers, newRacerItem]);
        if (racersOnPageData.racersOnPage.length < limitPerPage)
            racersOnPageData.setRacersOnPage([...racersOnPageData.racersOnPage, newRacerItem]);
    };

    const generateRacers = async () => {
        const newRacersPromises: Promise<TRacer>[] = Array.from(Array(100)).map(() =>
            createRacerAPI(generateRandomName(), generateRandomColour())
        );
        const newRacers: TRacersData = await Promise.all(newRacersPromises);
        racersData.setRacers([...racersData.racers, ...newRacers]);
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
