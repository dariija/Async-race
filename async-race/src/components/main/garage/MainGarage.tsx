import React, { useState } from 'react';
import RaceArena from '../../race-arena/RaceArena';
import CreateRacer from '../../settings/CreateRacer';
import EditRacer from '../../settings/EditRacer';
import StartRace from '../../settings/StartRace';
import { TRacersData } from '../../../types/TRacersData';
import TRacerDataStatus from '../../../types/TRacerDataStatus';
import { TRacersControl } from '../../../types/TRacerDataControl';

type Props = {
    racersData: {
        racers: TRacersData;
        setRacers: React.Dispatch<React.SetStateAction<TRacersData>>;
    };
};

export default function MainGarage({ racersData }: Props) {
    const [racersOnPage, setRacersOnPage] = useState<TRacersData>([]);
    const [selectedRacer, setSelectedRacer] = useState<TRacerDataStatus | null>(null);
    const limitPerPage = 7;
    const racersControl: TRacersControl = [];

    return (
        <main className="garage">
            <div className="container">
                <div className="settings">
                    <CreateRacer
                        racersData={racersData}
                        racersOnPageData={{ racersOnPage, setRacersOnPage }}
                        limitPerPage={limitPerPage}
                    />
                    <EditRacer selectedRacerData={{ selectedRacer, setSelectedRacer }} />

                    <StartRace racersControl={racersControl} />
                </div>

                <RaceArena
                    racersData={racersData}
                    racersOnPageData={{ racersOnPage, setRacersOnPage }}
                    selectedRacerData={{ selectedRacer, setSelectedRacer }}
                    limitPerPage={limitPerPage}
                    racersControl={racersControl}
                />
            </div>
        </main>
    );
}
