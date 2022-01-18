import TRacerDataStatus from './TRacerDataStatus';

type TRacerDataControl = {
    racerDataStatus: TRacerDataStatus;
    startRacer: () => Promise<number>;
    stopRacer: () => Promise<void>;
};

type TRacersControl = TRacerDataControl[];

export { TRacerDataControl, TRacersControl };
