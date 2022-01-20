import React, { useState } from 'react';
import Header from '../header/Header';
import MainGarage from '../main/garage/MainGarage';
import MainWinners from '../main/winners/MainWinners';

export default function App() {
    const pages = ['garage', 'winners'];
    const [activePage, setActivePage] = useState('Garage');

    return (
        <>
            <Header pages={pages} pageStatus={{ activePage, setActivePage }} />
            <MainGarage />
            {/* <MainWinners /> */}
        </>
    );
}
