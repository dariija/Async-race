import React, { useEffect, useRef } from 'react';
import Button from '../../button/Button';
import { TRacersData } from '../../../types/TRacersData';
import TRacerDataStatus from '../../../types/TRacerDataStatus';
import startEngineAPI from '../../../utils/startEngineAPI';
import stopEngineAPI from '../../../utils/stopEngineAPI';
import switchEngineToDriveModeAPI from '../../../utils/switchEngineToDriveModeAPI';
import deleteRacerAPI from '../../../utils/deleteRacerAPI';
import { TRacersControl } from '../../../types/TRacerDataControl';

type Props = {
    racersData: {
        racers: TRacersData;
        setRacers: React.Dispatch<React.SetStateAction<TRacersData>>;
    };
    racersOnPageData: {
        racersOnPage: TRacersData;
        setRacersOnPage: React.Dispatch<React.SetStateAction<TRacersData>>;
    };
    racerDataStatus: TRacerDataStatus;
    selectedRacerData: {
        selectedRacer: TRacerDataStatus | null;
        setSelectedRacer: React.Dispatch<React.SetStateAction<TRacerDataStatus | null>>;
    };
    racerEngineStartStatus: {
        isEngineStarted: boolean;
        setIsEngineStarted: React.Dispatch<React.SetStateAction<boolean>>;
    };
    racerEngineStopStatus: {
        isEngineStopped: boolean;
        setIsEngineStopped: React.Dispatch<React.SetStateAction<boolean>>;
    };
    racerAnimationStatus: {
        racerTimeAnimation: number;
        setRacerTimeAnimation: React.Dispatch<React.SetStateAction<number>>;
    };
    racersControl: TRacersControl;
};

export default function RacerControls({
    racersData,
    racersOnPageData,
    racerDataStatus,
    selectedRacerData,
    racerEngineStartStatus,
    racerEngineStopStatus,
    racerAnimationStatus,
    racersControl,
}: Props) {
    const startRacer = async () => {
        const start = await startEngineAPI(racerDataStatus.idData.id);
        racerEngineStopStatus.setIsEngineStopped(false);
        racerEngineStartStatus.setIsEngineStarted(true);

        const time = start.distance / start.velocity / 1000;
        racerAnimationStatus.setRacerTimeAnimation(time);

        const drive = await switchEngineToDriveModeAPI(racerDataStatus.idData.id);
        if (drive instanceof Error) racerEngineStopStatus.setIsEngineStopped(true);
        return time;
    };

    const stopRacer = async () => {
        racerEngineStopStatus.setIsEngineStopped(true);
        await stopEngineAPI(racerDataStatus.idData.id);
        racerEngineStartStatus.setIsEngineStarted(false);
        racerAnimationStatus.setRacerTimeAnimation(0);
    };

    const selectRacer = () => {
        selectedRacerData.setSelectedRacer(racerDataStatus);
    };

    const deleteRacer = async () => {
        await deleteRacerAPI(racerDataStatus.idData.id);
        const newData = racersData.racers.filter((racer) => racer.id !== racerDataStatus.idData.id);
        racersData.setRacers(newData);
        racersOnPageData.setRacersOnPage(newData);
    };

    const racerItemDataControl = useRef({ racerDataStatus, startRacer, stopRacer });
    useEffect(() => {
        racersControl.push(racerItemDataControl.current);
    }, []);

    return (
        <div className="racer__controls">
            <Button
                className="start"
                text="Start"
                handleClick={startRacer}
                disabled={racerEngineStartStatus.isEngineStarted}
            />
            <Button
                className="stop"
                text="Stop"
                handleClick={stopRacer}
                disabled={!racerEngineStartStatus.isEngineStarted}
            />
            <Button
                className="select"
                text="Select"
                handleClick={selectRacer}
                disabled={selectedRacerData.selectedRacer?.idData.id === racerDataStatus.idData.id}
            />
            <Button className="delete" text="Delete" handleClick={deleteRacer} disabled={false} />
        </div>
    );
}
