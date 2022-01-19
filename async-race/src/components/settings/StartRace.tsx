import React, { useEffect, useState } from 'react';
import { TRacersControl } from '../../types/TRacerDataControl';
import TRacerResponse from '../../types/TRacerResponse';
import TRacerWinner from '../../types/TRacerWinner';
import createWinnerAPI from '../../utils/createWinnerAPI';
import getWinnerAPI from '../../utils/getWinnerAPI';
import getWinnersAPI from '../../utils/getWinnersAPI';
import updateWinnerAPI from '../../utils/updateWinnerAPI';
import Button from '../button/Button';

type Props = {
    racersControl: TRacersControl;
};

export default function StartRace({ racersControl }: Props) {
    const [isRaceStart, setIsRaceStart] = useState(false);
    const [isRaceStop, setIsRaceStop] = useState(true);
    const [winner, setWinner] = useState<TRacerWinner | null>(null);

    useEffect(() => {
        (async () => {
            if (winner) {
                const findWinner = await getWinnerAPI(winner.id);
                if (findWinner instanceof Error) await createWinnerAPI(winner.id, 1, winner.time);
                await updateWinnerAPI(findWinner.id, findWinner.wins + 1, winner.time);
            }
        })();
    }, [winner]);

    const startRace = async () => {
        setIsRaceStart(true);
        setIsRaceStop(false);
        const racersPromises: TRacerResponse[] = racersControl.map((racer) => {
            return new Promise((resolve) => {
                (async () => {
                    const racerPromise = await racer.startRacer();
                    if (racerPromise instanceof Error) throw new Error();
                    resolve(racerPromise);
                })().catch((e) => e);
            });
        });
        const racerWinner = await Promise.any(racersPromises);
        if (!(racerWinner instanceof Error)) setWinner(racerWinner);
    };

    const stopRace = async () => {
        setIsRaceStop(true);
        setIsRaceStart(false);
        const racersPromises = racersControl.map((racer) => racer.stopRacer());
        await Promise.all(racersPromises);
        setWinner(null);
    };

    return (
        <div className="race">
            <Button className="start-race" text="Start race!" handleClick={startRace} disabled={isRaceStart} />
            <Button className="stop-race" text="Stop race" handleClick={stopRace} disabled={isRaceStop} />
        </div>
    );
}
