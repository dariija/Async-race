import React, { useEffect, useState } from 'react';
import TAppState from '../../types/TAppState';
import TRacerDataStatus from '../../types/TRacerDataStatus';
import Header from '../header/Header';
import MainGarage from '../main/garage/MainGarage';
import MainWinners from '../main/winners/MainWinners';
import Route from '../route/Route';

export default function App() {
    const pages = ['garage', 'winners'];
    const [activePage, setActivePage] = useState('garage');

    const [activeContentPage, setActiveContentPage] = useState(1);
    const [selectedRacer, setSelectedRacer] = useState<TRacerDataStatus | null>(null);
    const [newRacerName, setNewRacerName] = useState('');
    const [newRacerColour, setNewRacerColour] = useState('#000000');
    const [editedRacerName, setEditedRacerName] = useState('');
    const [editedRacerColour, setEditedRacerColour] = useState('#000000');
    const [editedRacerValueIsChanged, setEditedRacerValueIsChanged] = useState(false);

    const appStatus: TAppState = {
        page: { activeContentPage, setActiveContentPage },
        selected: { selectedRacer, setSelectedRacer },
        createName: { newRacerName, setNewRacerName },
        createColour: { newRacerColour, setNewRacerColour },
        editName: { editedRacerName, setEditedRacerName },
        editColor: { editedRacerColour, setEditedRacerColour },
        editState: { editedRacerValueIsChanged, setEditedRacerValueIsChanged },
    };

    useEffect(() => {
        const url = window.location;
        const redirectedUrl = `${url.protocol}//${url.host}/#garage`;
        document.location.replace(redirectedUrl);
    }, []);

    return (
        <>
            <Header pages={pages} pageStatus={{ activePage, setActivePage }} />
            <Route path="#garage">
                <MainGarage appState={appStatus} />
            </Route>

            <Route path="#winners">
                <MainWinners />
            </Route>
        </>
    );
}
