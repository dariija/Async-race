import React from 'react';

type Props = {
    text: string;
    className: string;
    handleClick?: () => void;
    disabled: boolean;
};

export default function Button({ text, className, handleClick, disabled }: Props) {
    return (
        <button className={className} type="button" onClick={handleClick} disabled={disabled}>
            {text}
        </button>
    );
}
