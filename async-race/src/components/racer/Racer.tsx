import React, { useEffect, useState } from 'react';
import RacerControls from './racer-controls/RacerControls';
import { TRacer, TRacersData } from '../../types/TRacersData';
import TRacerDataStatus from '../../types/TRacerDataStatus';
import { TRacersControl } from '../../types/TRacerDataControl';

type Props = {
    racersOnPageData: {
        racersOnPage: TRacersData;
        setRacersOnPage: React.Dispatch<React.SetStateAction<TRacersData>>;
    };
    racersItemData: TRacer;
    selectedRacerData: {
        selectedRacer: TRacerDataStatus | null;
        setSelectedRacer: React.Dispatch<React.SetStateAction<TRacerDataStatus | null>>;
    };
    racersControl: TRacersControl;
    dataStatus: {
        dataChanged: boolean;
        setDataChanged: React.Dispatch<React.SetStateAction<boolean>>;
    };
};

export default function Racer({
    racersOnPageData,
    racersItemData,
    selectedRacerData,
    racersControl,
    dataStatus,
}: Props) {
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

    const [isEngineStarted, setIsEngineStarted] = useState(false);
    const [isEngineStopped, setIsEngineStopped] = useState(false);
    const [racerTimeAnimation, setRacerTimeAnimation] = useState(0);

    return (
        <div className="racer">
            <div className="racer__panel">
                <div className="racer__info">
                    <span>{racerIdState}.</span>
                    <span>{racerNameState}</span>
                </div>

                <RacerControls
                    racersOnPageData={racersOnPageData}
                    selectedRacerData={selectedRacerData}
                    racerDataStatus={racerDataStatus}
                    racerEngineStartStatus={{ isEngineStarted, setIsEngineStarted }}
                    racerEngineStopStatus={{ isEngineStopped, setIsEngineStopped }}
                    racerAnimationStatus={{ racerTimeAnimation, setRacerTimeAnimation }}
                    racersControl={racersControl}
                    dataStatus={dataStatus}
                />
            </div>

            {/* <img className="racer__picture" src="./assets/w2.svg" alt="" /> */}
            <div
                className={`${isEngineStarted ? 'startEngine' : ''} ${isEngineStopped ? 'stopEngine' : ''}`}
                style={{
                    width: '30px',
                    height: '30px',
                    position: 'absolute',
                    right: 'calc(100% - 50px)',
                    backgroundColor: `${racerColourState}`,
                    animationDuration: `${racerTimeAnimation}s`,
                }}
            />
        </div>
    );
}
