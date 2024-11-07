import React, { useState } from 'react';
import '../styles/ControlBar.css';
import Button from './Button';

type Mode = 'short' | 'medium' | 'long';

type ControlBarProps = {
    setActiveMode: (mode: Mode) => void;
    onButtonClick: (buttonType: Mode) => void;
};

const ControlBar: React.FC<ControlBarProps> = ({ setActiveMode, onButtonClick }) => {
    const [activeMode, setActiveModeLocal] = useState<Mode>('short');

    const handleButtonClick = (buttonType: Mode) => {
        setActiveModeLocal(buttonType);
        setActiveMode(buttonType);
        onButtonClick(buttonType);
    };

    return (
        <div className="control-bar">
            <Button
                type="button"
                label="Short"
                isPrimary={activeMode === 'short'}
                onClick={() => handleButtonClick('short')}
            />
            <Button
                type="button"
                label="Medium"
                isPrimary={activeMode === 'medium'}
                onClick={() => handleButtonClick('medium')}
            />
            <Button
                type="button"
                label="Long"
                isPrimary={activeMode === 'long'}
                onClick={() => handleButtonClick('long')}
            />
        </div>
    );
};

export default ControlBar;
