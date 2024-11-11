import React from 'react';
import "../styles/ProgressContainer.css";
import ProgressLabel from "./ProgressLabel";
import ProgressBar from "./ProgressBar";

type ProgressContainerProps = {
    currentNum: number;
    endNum: number;
};

const ProgressContainer: React.FC<ProgressContainerProps> = ({ currentNum, endNum }) => {
    const safeCurrentNum = Math.max(0, Math.min(currentNum, endNum));
    const progress = Math.round((safeCurrentNum / endNum) * 100);

    return (
        <div className="progress-container">
            <ProgressLabel currentNum={safeCurrentNum} endNum={endNum} progress={progress} />
            <ProgressBar progress={progress} />
        </div>
    );
};

export default ProgressContainer;
