import '../styles/ControlBar.css';
import { useState } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

const ControlBar = ({ setActiveMode, onButtonClick }) => {
    const [activeMode, setActiveModeLocal] = useState('short');

    const handleButtonClick = (buttonType) => {
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
    )
}

ControlBar.propTypes = {
    setActiveMode: PropTypes.func,
    onButtonClick: PropTypes.func,
};

export default ControlBar;
