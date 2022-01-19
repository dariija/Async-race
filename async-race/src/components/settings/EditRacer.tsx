import React, { useEffect, useState } from 'react';
import Button from '../button/Button';
import TRacerDataStatus from '../../types/TRacerDataStatus';
import updateRacerAPI from '../../utils/updateRacerAPI';

type Props = {
    selectedRacerData: {
        selectedRacer: TRacerDataStatus | null;
        setSelectedRacer: React.Dispatch<React.SetStateAction<TRacerDataStatus | null>>;
    };
};

export default function EditRacer({ selectedRacerData }: Props) {
    const [editedRacerName, setEditedRacerName] = useState('');
    const editName = ({ target }: { target: HTMLInputElement }) => {
        setEditedRacerName(target.value);
    };

    const [editedRacerColour, setEditedRacerColour] = useState('#000000');
    const editColour = ({ target }: { target: HTMLInputElement }) => {
        setEditedRacerColour(target.value);
    };

    useEffect(() => {
        if (selectedRacerData.selectedRacer) {
            setEditedRacerName(selectedRacerData.selectedRacer.nameData.name);
        } else setEditedRacerName('');

        if (selectedRacerData.selectedRacer) {
            setEditedRacerColour(selectedRacerData.selectedRacer.colourData.colour);
        } else setEditedRacerColour('#000000');
    }, [selectedRacerData]);

    const editRacer = async () => {
        if (selectedRacerData.selectedRacer) {
            const updated = await updateRacerAPI(
                editedRacerName,
                editedRacerColour,
                selectedRacerData.selectedRacer.idData.id
            );
            if (!(updated instanceof Error)) {
                selectedRacerData.selectedRacer.nameData.setName(editedRacerName);
                selectedRacerData.selectedRacer.colourData.setColour(editedRacerColour);
                selectedRacerData.setSelectedRacer(null);
            }
        }
    };

    return (
        <div className="edit">
            <input type="text" onChange={editName} value={editedRacerName} />
            <input type="color" onChange={editColour} value={editedRacerColour} />
            <Button
                className="button"
                text="Edit"
                handleClick={editRacer}
                disabled={!selectedRacerData.selectedRacer}
            />
        </div>
    );
}
