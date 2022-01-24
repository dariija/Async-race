import React, { Children } from 'react';

type Props = {
    text?: string;
    className: string;
    handleClick: () => void;
    disabled: boolean;
    children?: JSX.Element;
};

export default function Button({ text, className, handleClick, disabled, children }: Props) {
    return (
        <button
            className={`${className} ${disabled ? 'button_disabled' : ''}`}
            type="button"
            onClick={handleClick}
            disabled={disabled}
        >
            {text}
            {children}
        </button>
    );
}

Button.defaultProps = {
    text: '',
    children: '',
};
