import React, { useEffect, useState } from 'react';
import TGetWinner from '../../types/TGetWinner';
import { TRacerDataControl } from '../../types/TRacerDataControl';
import TRacerResponse from '../../types/TRacerResponse';
import TRacerWinner from '../../types/TRacerWinner';
import createWinnerAPI from '../../utils/createWinnerAPI';
import getWinnerAPI from '../../utils/getWinnerAPI';
import updateWinnerAPI from '../../utils/updateWinnerAPI';
import Button from '../button/Button';
import ModalWindow from '../modal/ModalWindow';

type Props = {
    racersControlData: {
        racersControl: TRacerDataControl[];
        racersControlDispatch: React.Dispatch<{
            type: string;
            racer: TRacerDataControl;
        }>;
    };
};

export default function StartRace({ racersControlData }: Props) {
    const [isRaceStart, setIsRaceStart] = useState(false);
    const [isRaceStop, setIsRaceStop] = useState(false);
    const [getAnswer, setGetAnswer] = useState<TRacerWinner | Error>(new Error());
    const [winner, setWinner] = useState<TRacerWinner | null>(null);

    useEffect(() => {
        (async () => {
            if (winner) {
                const findWinner: TGetWinner | Error = await getWinnerAPI(winner.id);
                if (findWinner instanceof Error) await createWinnerAPI(winner.id, 1, winner.time);
                else if (findWinner.time < winner.time) {
                    await updateWinnerAPI(findWinner.id, findWinner.wins + 1, findWinner.time);
                } else {
                    await updateWinnerAPI(findWinner.id, findWinner.wins + 1, winner.time);
                }
            }
        })();
    }, [winner]);

    const startRace = async () => {
        setIsRaceStart(true);
        setIsRaceStop(false);

        const racersPromises: TRacerResponse[] = racersControlData.racersControl.map((racer) => {
            return new Promise((resolve) => {
                (async () => {
                    const racerPromise = await racer.startRacer();
                    if (racerPromise instanceof Error) throw new Error();
                    resolve(racerPromise);
                })().catch((e) => e);
            });
        });

        const racerWinner: TRacerWinner | Error = await Promise.any(racersPromises)
            .then((res) => res)
            .catch((e) => e);
        setGetAnswer(racerWinner);
    };

    useEffect(() => {
        if (!(getAnswer instanceof Error) && !isRaceStop) {
            setWinner(getAnswer);
        }
    }, [getAnswer]);

    const stopRace = async () => {
        setIsRaceStop(true);
        setIsRaceStart(false);
        const racersPromises = racersControlData.racersControl.map((racer) => racer.stopRacer());
        await Promise.all(racersPromises);
        setWinner(null);
    };

    return (
        <>
            <div className="settings-container">
                <p className="settings-container__header">Race</p>
                <div className="settings-container__content">
                    <Button
                        className="button button_start-race"
                        text="Start race!"
                        handleClick={startRace}
                        disabled={isRaceStart}
                    />
                    <Button
                        className="button button_stop-race"
                        text="Reset"
                        handleClick={stopRace}
                        disabled={isRaceStop}
                    />
                </div>
            </div>

            <ModalWindow className={`${winner ? 'showModal' : ''}`} winnerState={{ winner, setWinner }} />
        </>
    );
}
