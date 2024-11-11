// Button.tsx
import React from 'react';
import '../styles/Button.css';
import '../styles/ControlBar.css';

interface ButtonProps {
    type: 'button' | 'submit' | 'reset';
    label: string;
    isPrimary?: boolean;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, label, isPrimary, onClick }) => {
    const className = isPrimary ? 'btn primary' : 'btn secondary';
    return (
        <button type={type} className={className} onClick={onClick}>
            <span className="btn-label">{label}</span>
        </button>
    );
};

export default Button;
