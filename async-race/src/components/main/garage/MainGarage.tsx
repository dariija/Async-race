import React, { useEffect, useState } from 'react';
import RaceArena from '../../race-arena/RaceArena';
import CreateRacer from '../../settings/CreateRacer';
import EditRacer from '../../settings/EditRacer';
import StartRace from '../../settings/StartRace';
import { TRacersData } from '../../../types/TRacersData';
import TRacerDataStatus from '../../../types/TRacerDataStatus';
import { TRacersControl } from '../../../types/TRacerDataControl';

export default function MainGarage() {
    const [racersOnPage, setRacersOnPage] = useState<TRacersData>([]);
    const [selectedRacer, setSelectedRacer] = useState<TRacerDataStatus | null>(null);
    const limitPerPage = 7;
    const racersControl: TRacersControl = [];
    const [dataChanged, setDataChanged] = useState(false);

    return (
        <main className="garage">
            <div className="container">
                <div className="settings">
                    <CreateRacer dataStatus={{ dataChanged, setDataChanged }} />
                    <EditRacer selectedRacerData={{ selectedRacer, setSelectedRacer }} />
                    <StartRace racersControl={racersControl} />
                </div>

                <RaceArena
                    racersOnPageData={{ racersOnPage, setRacersOnPage }}
                    selectedRacerData={{ selectedRacer, setSelectedRacer }}
                    limitPerPage={limitPerPage}
                    racersControl={racersControl}
                    dataStatus={{ dataChanged, setDataChanged }}
                />
            </div>
        </main>
    );
}
