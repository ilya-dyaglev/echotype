// ControlBar.tsx
import React, { useState } from 'react';
import '../styles/ControlBar.css';
import Button from './Button';
import {BookData} from '../App.tsx';

type Mode = 'short' | 'medium' | 'long';

type ControlBarProps = {
    setActiveMode: (mode: Mode) => void;
    onFetchNewBook: (book: BookData[]) => void;
};

const ControlBar: React.FC<ControlBarProps> = ({ setActiveMode, onFetchNewBook }) => {
    const [activeMode, setActiveModeLocal] = useState<Mode>('short');

    const handleButtonClick = (buttonType: Mode) => {
        setActiveModeLocal(buttonType);
        setActiveMode(buttonType);
    };

    return (
        <div className="control-bar">
            <div>
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
            <button
                className="btn next-book"
                type="button"
                onClick={() => onFetchNewBook([])}
            ><span className="btn-label">next book</span></button>
        </div>
    );
};

export default ControlBar;
