import React, { useEffect } from 'react';
import Button from '../button/Button';
import updateRacerAPI from '../../utils/updateRacerAPI';
import TAppState from '../../types/TAppState';

type Props = {
    appState: TAppState;
};

export default function EditRacer({ appState }: Props) {
    const editName = ({ target }: { target: HTMLInputElement }) => {
        appState.editState.setEditedRacerValueIsChanged(true);
        appState.editName.setEditedRacerName(target.value);
    };

    const editColour = ({ target }: { target: HTMLInputElement }) => {
        appState.editState.setEditedRacerValueIsChanged(true);
        appState.editColor.setEditedRacerColour(target.value);
    };

    useEffect(() => {
        if (appState.selected.selectedRacer && !appState.editState.editedRacerValueIsChanged) {
            appState.editName.setEditedRacerName(appState.selected.selectedRacer.nameData.name);
            appState.editColor.setEditedRacerColour(appState.selected.selectedRacer.colourData.colour);
        } else if (appState.selected.selectedRacer === null) {
            appState.editName.setEditedRacerName('');
            appState.editColor.setEditedRacerColour('#000000');
        }
    }, [appState.selected]);

    const editRacer = async () => {
        if (appState.selected.selectedRacer) {
            const updated = await updateRacerAPI(
                appState.editName.editedRacerName,
                appState.editColor.editedRacerColour,
                appState.selected.selectedRacer.idData.id
            );
            if (!(updated instanceof Error)) {
                appState.selected.selectedRacer.nameData.setName(appState.editName.editedRacerName);
                appState.selected.selectedRacer.colourData.setColour(appState.editColor.editedRacerColour);
                appState.selected.setSelectedRacer(null);
                appState.editState.setEditedRacerValueIsChanged(false);
            }
        }
    };

    return (
        <div className="settings-container">
            <p className="settings-container__header">Edit</p>
            <div className="settings-container__content">
                <div className="button-group">
                    <input
                        type="text"
                        onChange={editName}
                        value={appState.editName.editedRacerName}
                        disabled={!appState.selected.selectedRacer}
                    />
                    <input
                        type="color"
                        onChange={editColour}
                        value={appState.editColor.editedRacerColour}
                        disabled={!appState.selected.selectedRacer}
                    />
                </div>
                <Button
                    className="button button_edit"
                    text="Edit"
                    handleClick={editRacer}
                    disabled={!appState.selected.selectedRacer}
                />
            </div>
        </div>
    );
}
