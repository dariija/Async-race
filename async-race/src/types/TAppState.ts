import TRacerDataStatus from './TRacerDataStatus';

type TAppState = {
    page: {
        activeContentPage: number;
        setActiveContentPage: React.Dispatch<React.SetStateAction<number>>;
    };
    selected: {
        selectedRacer: TRacerDataStatus | null;
        setSelectedRacer: React.Dispatch<React.SetStateAction<TRacerDataStatus | null>>;
    };
    createName: {
        newRacerName: string;
        setNewRacerName: React.Dispatch<React.SetStateAction<string>>;
    };
    createColour: {
        newRacerColour: string;
        setNewRacerColour: React.Dispatch<React.SetStateAction<string>>;
    };
    editName: {
        editedRacerName: string;
        setEditedRacerName: React.Dispatch<React.SetStateAction<string>>;
    };
    editColor: {
        editedRacerColour: string;
        setEditedRacerColour: React.Dispatch<React.SetStateAction<string>>;
    };
    editState: {
        editedRacerValueIsChanged: boolean;
        setEditedRacerValueIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
    };
};

export default TAppState;
