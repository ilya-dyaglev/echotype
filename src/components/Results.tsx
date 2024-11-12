import React from 'react';
import '../styles/Results.css';
import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
} from 'recharts';

interface TypingStats {
    wpm: number;
    accuracy: number;
    errors: number;
    timeTaken: number; // in seconds
    charsTyped: number;
    statsOverTime: Array<{ time: number; wpm: number; accuracy: number }>;
}

interface ResultsProps {
    typingStats: TypingStats;
    onRetake: () => void;
}

const Results: React.FC<ResultsProps> = ({ typingStats, onRetake }) => {
    const { wpm, accuracy, charsTyped, timeTaken, statsOverTime } = typingStats;

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} mins`;
    };

    // Format tick values to two decimal places
    const formatTick = (tick: number) => {
        return tick.toFixed(2);
    };

    return (
        <div className="results">
            <span className="results-title">Typing Test Results</span>
            <div className="metadata">
                <div className="metadata-item">
                    <p>Speed</p>
                    <p>{wpm} WPM</p>
                </div>
                <div className="metadata-item">
                    <p>Accuracy</p>
                    <p>{accuracy}%</p>
                </div>
                <div className="metadata-item">
                    <p>Characters</p>
                    <p>{charsTyped}</p>
                </div>
                <div className="metadata-item">
                    <p>Time</p>
                    <p>{formatTime(timeTaken)}</p>
                </div>
            </div>
            <div className="graphs">
                <div className="graph-item">
                    <h3>Typing Speed Over Time</h3>
                    <LineChart
                        width={400}
                        height={200}
                        data={statsOverTime}
                        margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                    >
                        <XAxis
                            dataKey="time"
                            tickFormatter={formatTick}
                            tick={{ fill: '#E5E8EB' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            formatter={(value: number) => `${value.toFixed(2)} WPM`}
                            labelFormatter={(label) => `Time: ${label.toFixed(2)}s`}
                            contentStyle={{ backgroundColor: '#1C2126', border: 'none' }}
                            itemStyle={{ color: '#8884d8' }}
                            labelStyle={{ color: '#E5E8EB' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="wpm"
                            stroke="#8884d8"
                            strokeWidth={3}
                            dot={false}
                            isAnimationActive={false}
                            style={{ filter: 'drop-shadow(0px 0px 5px rgba(136, 132, 216, 0.6))'}}
                        />
                    </LineChart>
                </div>
                <div className="graph-item">
                    <h3>Accuracy Over Time</h3>
                    <LineChart
                        width={400}
                        height={200}
                        data={statsOverTime}
                        margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                    >
                        <XAxis
                            dataKey="time"
                            tickFormatter={formatTick}
                            tick={{ fill: '#E5E8EB' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            formatter={(value: number) => `${value.toFixed(2)}%`}
                            labelFormatter={(label) => `Time: ${label.toFixed(2)}s`}
                            contentStyle={{ backgroundColor: '#1C2126', border: 'none' }}
                            itemStyle={{ color: '#82ca9d' }}
                            labelStyle={{ color: '#E5E8EB' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="accuracy"
                            stroke="#82ca9d"
                            strokeWidth={3}
                            dot={false}
                            isAnimationActive={false}
                            style={{ filter: 'drop-shadow(0px 0px 5px rgba(130, 202, 157, 0.6))' }}
                        />
                    </LineChart>
                </div>
            </div>
            <div className="buttons">
                <button className={'btn'} onClick={onRetake}><span className='btn-label'>Retake</span></button>
                {/*<button className={'btn'}>Track your progress</button> I'll be able to do this someday...*/}
            </div>
        </div>
    );
};

export default Results;
