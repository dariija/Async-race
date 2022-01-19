import TRacerDataStatus from './TRacerDataStatus';
import TRacerResponse from './TRacerResponse';

type TRacerDataControl = {
    racerDataStatus: TRacerDataStatus;
    startRacer: () => TRacerResponse;
    stopRacer: () => Promise<void>;
};

type TRacersControl = TRacerDataControl[];

export { TRacerDataControl, TRacersControl };
