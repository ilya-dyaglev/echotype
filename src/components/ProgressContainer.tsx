import React from 'react';
import "../styles/ProgressContainer.css";
import ProgressLabel from "./ProgressLabel";
import ProgressBar from "./ProgressBar";

type ProgressContainerProps = {
    currentNum: number;
    endNum: number;
};

const ProgressContainer: React.FC<ProgressContainerProps> = ({ currentNum, endNum }) => {
    const progress = Math.round((currentNum / endNum) * 100);
    return (
        <div className="progress-container">
            <ProgressLabel currentNum={currentNum} endNum={endNum} progress={progress} />
            <ProgressBar progress={Math.round(progress)} />
        </div>
    );
};

export default ProgressContainer;
