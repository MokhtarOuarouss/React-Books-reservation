import React from 'react'

type ButtonProps = {
    onClick: () => void;
    className: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, className }) => {
    return (
        <button type="button" className={className} onClick={onClick} >
        </button>
    );
};

export default Button