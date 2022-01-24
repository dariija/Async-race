import React from 'react';
import TRacerWinner from '../../types/TRacerWinner';

type Props = {
    winnerState: {
        winner: TRacerWinner | null;
        setWinner: React.Dispatch<React.SetStateAction<TRacerWinner | null>>;
    };
    className: string;
};

export default function ModalWindow({ winnerState, className }: Props) {
    const endAnimationHandler = () => {
        winnerState.setWinner(null);
    };

    return (
        <div className={`modal-wrapper ${className}`} onAnimationEnd={endAnimationHandler}>
            <div className="modal">
                <p>Winner is {winnerState.winner?.name}!</p>
                <p>Time: {winnerState.winner?.time}</p>
            </div>
        </div>
    );
}
