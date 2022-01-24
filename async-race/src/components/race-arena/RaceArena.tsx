import React, { useEffect, useState } from 'react';
import PageNavigation from '../navigation/page-navigation/PageNavigation';
import Racer from '../racer/Racer';
import { TRacersData } from '../../types/TRacersData';
import TRacerDataStatus from '../../types/TRacerDataStatus';
import { TRacerDataControl, TRacersControl } from '../../types/TRacerDataControl';
import getRacersAPI from '../../utils/getRacersAPI';
import TAppState from '../../types/TAppState';

type Props = {
    racersOnPageData: {
        racersOnPage: TRacersData;
        setRacersOnPage: React.Dispatch<React.SetStateAction<TRacersData>>;
    };
    limitPerPage: number;
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

export default function RaceArena({ racersOnPageData, limitPerPage, dataStatus, racersControlData, appState }: Props) {
    const [pagesQuantity, setPagesQuantity] = useState(1);
    const [allRacersQuantity, setAllRacersQuantity] = useState(0);

    const updateRacersOnPage = async () => {
        const getRacers = await getRacersAPI(appState.page.activeContentPage, limitPerPage);
        setPagesQuantity(Math.ceil(getRacers.allRacers / limitPerPage));
        setAllRacersQuantity(getRacers.allRacers);
        racersOnPageData.setRacersOnPage(getRacers.racersPerPage);
    };

    useEffect(() => {
        updateRacersOnPage();
    }, [appState.page.activeContentPage]);

    useEffect(() => {
        if (dataStatus.dataChanged) updateRacersOnPage();
        dataStatus.setDataChanged(false);
    }, [dataStatus, pagesQuantity]);

    return (
        <div className="race-arena">
            <div className="race-arena__page">
                <p className="race-arena__header">
                    Garage <span className="race-arena__quantity">{allRacersQuantity}</span>
                </p>
                {racersOnPageData.racersOnPage.map((item) => (
                    <div className="race-arena__item" key={`arena_item_${item.id.toString()}`}>
                        <Racer
                            racersItemData={item}
                            dataStatus={dataStatus}
                            key={`racer_${item.id.toString()}`}
                            racersControlData={racersControlData}
                            appState={appState}
                        />
                    </div>
                ))}
            </div>

            <PageNavigation pagesQuantity={pagesQuantity} page={appState.page} path="garage" />
        </div>
    );
}
