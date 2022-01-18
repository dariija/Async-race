import React, { useEffect, useState } from 'react';
import PageNavigation from '../navigation/page-navigation/PageNavigation';
import Racer from '../racer/Racer';
import { TRacersData } from '../../types/TRacersData';
import TRacerDataStatus from '../../types/TRacerDataStatus';
import { TRacersControl } from '../../types/TRacerDataControl';

type Props = {
    racersData: {
        racers: TRacersData;
        setRacers: React.Dispatch<React.SetStateAction<TRacersData>>;
    };
    racersOnPageData: {
        racersOnPage: TRacersData;
        setRacersOnPage: React.Dispatch<React.SetStateAction<TRacersData>>;
    };
    selectedRacerData: {
        selectedRacer: TRacerDataStatus | null;
        setSelectedRacer: React.Dispatch<React.SetStateAction<TRacerDataStatus | null>>;
    };
    limitPerPage: number;
    racersControl: TRacersControl;
};

export default function RaceArena({
    racersData,
    racersOnPageData,
    selectedRacerData,
    limitPerPage,
    racersControl,
}: Props) {
    const garagePagesQuantity = Math.ceil(racersData.racers.length / limitPerPage);
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        const racersFrom = (activePage - 1) * limitPerPage;
        const racersPerPage: TRacersData = [];
        for (let i = 0; i < limitPerPage; i += 1) {
            if (racersData.racers[racersFrom + i]) racersPerPage.push(racersData.racers[racersFrom + i]);
            else break;
        }
        racersOnPageData.setRacersOnPage(racersPerPage);
    }, [activePage, racersData]);

    return (
        <div className="race-arena">
            <div className="race-arena__page">
                <div>{racersData.racers.length}</div>
                <div>{racersOnPageData.racersOnPage.length}</div>
                {racersOnPageData.racersOnPage.map((item) => (
                    <div className="race-arena__item" key={`arena_item_${item.id.toString()}`}>
                        <Racer
                            racersData={racersData}
                            racersOnPageData={racersOnPageData}
                            racersItemData={item}
                            selectedRacerData={selectedRacerData}
                            key={`racer_${item.id.toString()}`}
                            racersControl={racersControl}
                        />
                    </div>
                ))}
            </div>

            <PageNavigation pagesQuantity={garagePagesQuantity} page={{ activePage, setActivePage }} path="garage" />
        </div>
    );
}
