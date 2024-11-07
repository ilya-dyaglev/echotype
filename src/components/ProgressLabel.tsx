import React from 'react';

type ProgressLabelProps = {
    currentNum: string | number;
    endNum: string | number;
    progress: string | number;
};

const ProgressLabel: React.FC<ProgressLabelProps> = ({ currentNum, endNum, progress }) => {
    return (
        <div className="progress-label">
            <div>
                <span>{currentNum}</span>
                <span>/</span>
                <span>{endNum}</span>
            </div>
            <span>{progress}%</span>
        </div>
    );
};

export default ProgressLabel;
