import React, { useEffect, useRef } from 'react';
import Button from '../../button/Button';
import TRacerDataStatus from '../../../types/TRacerDataStatus';
import startEngineAPI from '../../../utils/startEngineAPI';
import stopEngineAPI from '../../../utils/stopEngineAPI';
import switchEngineToDriveModeAPI from '../../../utils/switchEngineToDriveModeAPI';
import deleteRacerAPI from '../../../utils/deleteRacerAPI';
import { TRacerDataControl, TRacersControl } from '../../../types/TRacerDataControl';
import getWinnerAPI from '../../../utils/getWinnerAPI';
import deleteWinnerAPI from '../../../utils/deleteWinnerAPI';
import TAppState from '../../../types/TAppState';

type Props = {
    racerDataStatus: TRacerDataStatus;
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
    dataStatus: {
        dataChanged: boolean;
        setDataChanged: React.Dispatch<React.SetStateAction<boolean>>;
    };
    racersControlData: {
        racersControl: TRacerDataControl[];
        racersControlDispatch: React.Dispatch<{
            type: string;
            racer: TRacerDataControl;
        }>;
    };
    appState: TAppState;
};

export default function RacerControls({
    racerDataStatus,
    racerEngineStartStatus,
    racerEngineStopStatus,
    racerAnimationStatus,
    dataStatus,
    racersControlData,
    appState,
}: Props) {
    const startRacer = async () => {
        const start = await startEngineAPI(racerDataStatus.idData.id);
        if (!(start instanceof Error)) {
            racerEngineStopStatus.setIsEngineStopped(false);
            racerEngineStartStatus.setIsEngineStarted(true);

            const time = start.distance / start.velocity / 1000;
            racerAnimationStatus.setRacerTimeAnimation(time);
            const drive = await switchEngineToDriveModeAPI(racerDataStatus.idData.id);
            if (drive instanceof Error) {
                racerEngineStopStatus.setIsEngineStopped(true);
                return new Error();
            }
            return { name: racerDataStatus.nameData.name, id: racerDataStatus.idData.id, time };
        }
        return new Error();
    };

    const stopRacer = async () => {
        racerEngineStopStatus.setIsEngineStopped(true);
        const stopped = await stopEngineAPI(racerDataStatus.idData.id);
        if (!(stopped instanceof Error)) {
            racerEngineStartStatus.setIsEngineStarted(false);
            racerAnimationStatus.setRacerTimeAnimation(0);
        }
    };

    const selectRacer = () => {
        appState.editState.setEditedRacerValueIsChanged(false);
        appState.selected.setSelectedRacer(racerDataStatus);
    };

    const deleteRacer = async () => {
        const findWinner = await getWinnerAPI(racerDataStatus.idData.id);
        if (!(findWinner instanceof Error)) {
            await deleteWinnerAPI(racerDataStatus.idData.id);
        }
        const deletedRacer = await deleteRacerAPI(racerDataStatus.idData.id);
        if (!(deletedRacer instanceof Error)) {
            dataStatus.setDataChanged(true);
        }
    };

    const racerItemDataControl = useRef({ racerDataStatus, startRacer, stopRacer });

    useEffect(() => {
        if (appState.selected.selectedRacer?.idData.id === racerDataStatus.idData.id) {
            appState.selected.setSelectedRacer(racerDataStatus);
        }

        racersControlData.racersControlDispatch({ type: 'add', racer: racerItemDataControl.current });
        return () => {
            racersControlData.racersControlDispatch({ type: 'delete', racer: racerItemDataControl.current });
        };
    }, []);

    return (
        <div className="racer__controls">
            <div className="button-group">
                <Button
                    className="button button_start"
                    text="Start"
                    handleClick={startRacer}
                    disabled={racerEngineStartStatus.isEngineStarted}
                />
                <Button
                    className="button button_stop"
                    text="Stop"
                    handleClick={stopRacer}
                    disabled={!racerEngineStartStatus.isEngineStarted}
                />
            </div>
            <div className="button-group">
                <Button
                    className="button button_select"
                    text="Select"
                    handleClick={selectRacer}
                    disabled={appState.selected.selectedRacer?.idData.id === racerDataStatus.idData.id}
                />
                <Button className="button button_delete" text="Delete" handleClick={deleteRacer} disabled={false} />
            </div>
        </div>
    );
}
