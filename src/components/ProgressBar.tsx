import React from 'react';

type ProgressBarProps = {
    progress: string | number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div className="progress-bar">
            <div style={{ width: `${progress}%` }}></div>
        </div>
    );
};

export default ProgressBar;
