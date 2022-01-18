import React, { useState } from 'react';
import { TRacersControl } from '../../types/TRacerDataControl';
import Button from '../button/Button';

type Props = {
    racersControl: TRacersControl;
};

export default function StartRace({ racersControl }: Props) {
    const [isRaceStart, setIsRaceStart] = useState(false);
    const [isRaceStop, setIsRaceStop] = useState(true);

    const startRace = async () => {
        setIsRaceStart(true);
        setIsRaceStop(false);
        const racersPromises = racersControl.map((racer) => racer.startRacer());
        const winner = await Promise.race(racersPromises);
        console.log(winner);
    };

    const stopRace = async () => {
        setIsRaceStop(true);
        setIsRaceStart(false);
        const racersPromises = racersControl.map((racer) => racer.stopRacer());
        await Promise.race(racersPromises);
    };

    return (
        <div className="race">
            <Button className="start-race" text="Start race!" handleClick={startRace} disabled={isRaceStart} />
            <Button className="stop-race" text="Stop race" handleClick={stopRace} disabled={isRaceStop} />
        </div>
    );
}
