// ControlBar.tsx
import React, { useState } from 'react';
import '../styles/ControlBar.css';
import Button from './Button';

type Mode = 'short' | 'medium' | 'long';

type ControlBarProps = {
    setActiveMode: (mode: Mode) => void;
};

const ControlBar: React.FC<ControlBarProps> = ({ setActiveMode }) => {
    const [activeMode, setActiveModeLocal] = useState<Mode>('short');

    const handleButtonClick = (buttonType: Mode) => {
        setActiveModeLocal(buttonType);
        setActiveMode(buttonType);
    };

    return (
        <div className="control-bar">
            <Button
                type="button"
                label="short"
                isPrimary={activeMode === 'short'}
                onClick={() => handleButtonClick('short')}
            />
            <Button
                type="button"
                label="medium"
                isPrimary={activeMode === 'medium'}
                onClick={() => handleButtonClick('medium')}
            />
            <Button
                type="button"
                label="long"
                isPrimary={activeMode === 'long'}
                onClick={() => handleButtonClick('long')}
            />
        </div>
    );
};

export default ControlBar;
