import React from 'react';
import Button from '../button/Button';
import { TRacer } from '../../types/TRacersData';
import generateRandomName from '../../utils/generateRandomName';
import generateRandomColour from '../../utils/generateRandomColour';
import createRacerAPI from '../../utils/createRacerAPI';
import TAppState from '../../types/TAppState';

type Props = {
    dataStatus: {
        dataChanged: boolean;
        setDataChanged: React.Dispatch<React.SetStateAction<boolean>>;
    };
    appState: TAppState;
};

export default function CreateRacer({ dataStatus, appState }: Props) {
    const changeName = ({ target }: { target: HTMLInputElement }) => {
        appState.createName.setNewRacerName(target.value);
    };

    const changeColour = ({ target }: { target: HTMLInputElement }) => {
        appState.createColour.setNewRacerColour(target.value);
    };

    const createRacer = async () => {
        await createRacerAPI(appState.createName.newRacerName, appState.createColour.newRacerColour);
        dataStatus.setDataChanged(true);
        appState.createName.setNewRacerName('');
        appState.createColour.setNewRacerColour('#000000');
    };

    const generateRacers = async () => {
        const newRacersPromises: Promise<TRacer>[] = Array.from(Array(100)).map(() =>
            createRacerAPI(generateRandomName(), generateRandomColour())
        );
        await Promise.all(newRacersPromises);
        dataStatus.setDataChanged(true);
    };

    return (
        <div className="settings-container">
            <p className="settings-container__header">Create</p>
            <div className="settings-container__content">
                <div className="button-group">
                    <input type="text" onChange={changeName} value={appState.createName.newRacerName} />
                    <input type="color" onChange={changeColour} value={appState.createColour.newRacerColour} />
                </div>
                <Button className="button button_create" text="Create" handleClick={createRacer} disabled={false} />
                <Button
                    className="button button_generate"
                    text="Generate"
                    handleClick={generateRacers}
                    disabled={false}
                />
            </div>
        </div>
    );
}
