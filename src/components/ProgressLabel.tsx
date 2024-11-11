import React from 'react';
import "../styles/ProgressContainer.css";

type ProgressLabelProps = {
    currentNum: number;
    endNum: number;
    progress: number;
};

const ProgressLabel: React.FC<ProgressLabelProps> = ({ currentNum, endNum, progress }) => {
    return (
        <div className="progress-label">
            <span>{`Progress: ${progress}%`}</span>
            <span>{`${currentNum} / ${endNum}`}</span>
        </div>
    );
};

export default ProgressLabel;
