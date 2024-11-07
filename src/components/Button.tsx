import React, { ReactNode } from 'react';
import '../styles/Button.css';

type ButtonProps = {
    children?: ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    label?: string;
    isPrimary?: boolean;
    disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
                                       children = [],
                                       onClick = () => {},
                                       type = 'button',
                                       className = '',
                                       label = '',
                                       isPrimary = false,
                                       disabled = false,
                                       }) => {
    return (
        <button
            type={type}
            className={`btn ${isPrimary ? 'primary' : 'secondary'} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label && <span className="btn-label">{label}</span>}
            {children}
        </button>
    );
};

export default Button;
