import React from 'react';
import '../styles/TypingArea.css';

type TypingAreaProps = {
    textData: string;
};

const TypingArea: React.FC<TypingAreaProps> = ({ textData }) => {
    return (
        <div className="typing-area">
            <div className="text-data">{textData}</div>
        </div>
    );
};

export default TypingArea;
