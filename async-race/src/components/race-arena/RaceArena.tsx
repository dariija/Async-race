import React, { useEffect, useState } from 'react';
import PageNavigation from '../navigation/page-navigation/PageNavigation';
import Racer from '../racer/Racer';
import { TRacersData } from '../../types/TRacersData';
import TRacerDataStatus from '../../types/TRacerDataStatus';
import { TRacersControl } from '../../types/TRacerDataControl';
import getRacersAPI from '../../utils/getRacersAPI';

type Props = {
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
    dataStatus: {
        dataChanged: boolean;
        setDataChanged: React.Dispatch<React.SetStateAction<boolean>>;
    };
};

export default function RaceArena({
    racersOnPageData,
    selectedRacerData,
    limitPerPage,
    racersControl,
    dataStatus,
}: Props) {
    const [pagesQuantity, setPagesQuantity] = useState(1);
    const [activePage, setActivePage] = useState(1);

    const updateRacersOnPage = async () => {
        const getRacers = await getRacersAPI(activePage, limitPerPage);
        setPagesQuantity(Math.ceil(getRacers.allRacers / limitPerPage));
        racersOnPageData.setRacersOnPage(getRacers.racersPerPage);
    };

    useEffect(() => {
        updateRacersOnPage();
    }, [activePage]);

    useEffect(() => {
        if (dataStatus.dataChanged) updateRacersOnPage();
        dataStatus.setDataChanged(false);
    }, [dataStatus, pagesQuantity]);

    return (
        <div className="race-arena">
            <div className="race-arena__page">
                <div>{racersOnPageData.racersOnPage.length}</div>
                {racersOnPageData.racersOnPage.map((item) => (
                    <div className="race-arena__item" key={`arena_item_${item.id.toString()}`}>
                        <Racer
                            racersOnPageData={racersOnPageData}
                            racersItemData={item}
                            selectedRacerData={selectedRacerData}
                            racersControl={racersControl}
                            dataStatus={dataStatus}
                            key={`racer_${item.id.toString()}`}
                        />
                    </div>
                ))}
            </div>

            <PageNavigation pagesQuantity={pagesQuantity} page={{ activePage, setActivePage }} path="garage" />
        </div>
    );
}
