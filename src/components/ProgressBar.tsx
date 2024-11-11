import React from 'react';
import "../styles/ProgressContainer.css";

type ProgressBarProps = {
    progress: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div className="progress-bar">
            <div style={{ width: `${progress}%` }}></div>
        </div>
    );
};

export default ProgressBar;
