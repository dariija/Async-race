import React, { useEffect, useState } from 'react';
import getRacersAPI from '../../utils/getRacersAPI';
import { TRacersData } from '../../types/TRacersData';
import Header from '../header/Header';
import MainGarage from '../main/garage/MainGarage';
import MainWinners from '../main/winners/MainWinners';

export default function App() {
    const pages = ['garage', 'winners'];
    const [activePage, setActivePage] = useState('Garage');
    const [racers, setRacers] = useState<TRacersData>([]);

    useEffect(() => {
        (async () => {
            const allRacers: TRacersData = await getRacersAPI();
            setRacers(allRacers);
        })();
    }, []);

    return (
        <>
            <Header pages={pages} pageStatus={{ activePage, setActivePage }} />
            {/* <MainGarage racersData={{ racers, setRacers }} /> */}
            <MainWinners />
        </>
    );
}
