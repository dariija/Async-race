import React, { useEffect, useState } from 'react';
import RacerControls from './racer-controls/RacerControls';
import { TRacer } from '../../types/TRacersData';
import { TRacerDataControl } from '../../types/TRacerDataControl';
import RacerPicture from '../picture/RacerPicture';
import TAppState from '../../types/TAppState';

type Props = {
    racersItemData: TRacer;
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
    racerNumber: number;
    appState: TAppState;
};

export default function Racer({ racersItemData, racerNumber, dataStatus, racersControlData, appState }: Props) {
    const [racerNameState, setRacerNameState] = useState(racersItemData.name);
    const [racerColourState, setRacerColourState] = useState(racersItemData.color);
    const [racerIdState, setRacerIdState] = useState(racersItemData.id);
    const racerDataStatus = {
        nameData: {
            name: racerNameState,
            setName: setRacerNameState,
        },
        colourData: {
            colour: racerColourState,
            setColour: setRacerColourState,
        },
        idData: {
            id: racerIdState,
            setId: setRacerIdState,
        },
    };

    useEffect(() => {
        const racer = racersItemData;
        racer.name = racerNameState;
        racer.color = racerColourState;
    }, [racerDataStatus]);

    useEffect(() => {
        return () => {
            setRacerNameState('');
            setRacerColourState('');
            setRacerIdState(0);
        };
    }, []);

    const [isEngineStarted, setIsEngineStarted] = useState(false);
    const [isEngineStopped, setIsEngineStopped] = useState(false);
    const [racerTimeAnimation, setRacerTimeAnimation] = useState(0);

    return (
        <div className="racer">
            <div className="racer__panel">
                <div className="racer__info">
                    <span>{racerNumber}.</span>
                    <span>{racerNameState}</span>
                </div>

                <RacerControls
                    racerDataStatus={racerDataStatus}
                    racerEngineStartStatus={{ isEngineStarted, setIsEngineStarted }}
                    racerEngineStopStatus={{ isEngineStopped, setIsEngineStopped }}
                    racerAnimationStatus={{ racerTimeAnimation, setRacerTimeAnimation }}
                    dataStatus={dataStatus}
                    racersControlData={racersControlData}
                    appState={appState}
                />
            </div>

            <div
                className={`racer_picture ${isEngineStarted ? 'startEngine' : ''} ${
                    isEngineStopped ? 'stopEngine' : ''
                }`}
                style={{
                    animationDuration: `${racerTimeAnimation}s`,
                }}
            >
                <RacerPicture colour={racerColourState} className="racer__svg_garage" />
            </div>
        </div>
    );
}
