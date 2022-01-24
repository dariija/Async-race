import React, { useEffect, useReducer, useState } from 'react';
import RaceArena from '../../race-arena/RaceArena';
import CreateRacer from '../../settings/CreateRacer';
import EditRacer from '../../settings/EditRacer';
import StartRace from '../../settings/StartRace';
import { TRacersData } from '../../../types/TRacersData';
import TRacerDataStatus from '../../../types/TRacerDataStatus';
import { TRacerDataControl, TRacersControl } from '../../../types/TRacerDataControl';
import TAppState from '../../../types/TAppState';

type Props = {
    appState: TAppState;
};

export default function MainGarage({ appState }: Props) {
    const [racersOnPage, setRacersOnPage] = useState<TRacersData>([]);
    const limitPerPage = 7;
    const [dataChanged, setDataChanged] = useState(false);

    function racersControlReducer(state: TRacersControl, action: { type: string; racer: TRacerDataControl }) {
        if (action.type === 'add') return [...state, action.racer];
        if (action.type === 'delete') {
            const newState = state.filter((item) => item !== action.racer);
            return [...newState];
        }
        return [...state];
    }
    const [racersControl, racersControlDispatch] = useReducer(racersControlReducer, []);

    return (
        <main className="garage">
            <div className="container">
                <div className="settings">
                    <CreateRacer dataStatus={{ dataChanged, setDataChanged }} appState={appState} />
                    <EditRacer appState={appState} />
                    <StartRace racersControlData={{ racersControl, racersControlDispatch }} />
                </div>

                <RaceArena
                    racersOnPageData={{ racersOnPage, setRacersOnPage }}
                    limitPerPage={limitPerPage}
                    dataStatus={{ dataChanged, setDataChanged }}
                    racersControlData={{ racersControl, racersControlDispatch }}
                    appState={appState}
                />
            </div>
        </main>
    );
}
