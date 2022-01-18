type TRacerDataStatus = {
    nameData: {
        name: string;
        setName: React.Dispatch<React.SetStateAction<string>>;
    };
    colourData: {
        colour: string;
        setColour: React.Dispatch<React.SetStateAction<string>>;
    };
    idData: {
        id: number;
        setId: React.Dispatch<React.SetStateAction<number>>;
    };
};

export default TRacerDataStatus;
