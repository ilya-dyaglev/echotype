import React, { useState, useEffect, useRef } from 'react';
import '../styles/TypingArea.css'; // Import CSS styles for the TypingArea component
import ProgressContainer from './ProgressContainer'; // Import the ProgressContainer component

// Define the props expected by the TypingArea component
type TypingAreaProps = {
    textData: string; // The text (quote) that the user will type
    onFinish: (stats: TypingStats) => void; // Callback when typing is finished
    onFetchNewBook: () => void;
};

// Define the structure for typing stats
interface TypingStats {
    wpm: number;
    accuracy: number;
    errors: number;
    timeTaken: number; // in seconds
    charsTyped: number;
    statsOverTime: Array<{ time: number; wpm: number; accuracy: number }>;
}

// Interface defining the structure of a typed character
interface TypedChar {
    char: string; // The character itself
    status: 'correct' | 'incorrect' | 'pending' | 'current'; // The status of the character
}

// TypingArea component definition
const TypingArea: React.FC<TypingAreaProps> = ({ textData, onFinish, onFetchNewBook }) => {
    // State variables
    const [typedChars, setTypedChars] = useState<TypedChar[]>([]);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [errors, setErrors] = useState(0);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [wpm, setWpm] = useState<number>(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // State to keep track of typing stats over time
    const [statsOverTime, setStatsOverTime] = useState<
        Array<{ time: number; wpm: number; accuracy: number }>
    >([]);

    // Use Array.from to correctly handle Unicode characters in the textData
    const quoteCharacters = React.useMemo(() => Array.from(textData), [textData]);

    // Reference to the typing area DOM element
    const textAreaRef = useRef<HTMLDivElement>(null);

    // Effect to initialize or reset the component state when textData changes
    useEffect(() => {
        setTypedChars(
            quoteCharacters.map((char) => ({
                char,
                status: 'pending',
            }))
        );
        setCurrentCharIndex(0);
        setErrors(0);
        setStartTime(null);
        setWpm(0);
        setIsFinished(false);
        setStatsOverTime([]);
    }, [quoteCharacters]);

    // Effect to start the timer when the user types the first character
    useEffect(() => {
        if (currentCharIndex === 1 && !startTime) {
            setStartTime(new Date());
        }
    }, [currentCharIndex, startTime]);

    // Effect to update WPM and accuracy in real-time as the user types
    // Also records stats over time
    useEffect(() => {
        if (startTime && !isFinished && currentCharIndex > 0) {
            calculateWPM();
            recordStats();
        }
    }, [currentCharIndex]);

    // Effect to check if typing is finished
    // Sets isFinished to true and calculates final WPM when typing is complete
    useEffect(() => {
        if (currentCharIndex >= quoteCharacters.length && !isFinished) {
            setIsFinished(true);
            calculateWPM();

            // Pass the stats to the parent component
            const timeTaken = (new Date().getTime() - startTime!.getTime()) / 1000; // in seconds
            onFinish({
                wpm,
                accuracy,
                errors,
                timeTaken,
                charsTyped: currentCharIndex,
                statsOverTime,
            });
        }
    }, [currentCharIndex, quoteCharacters.length, isFinished]);

    // Effect to auto-focus the typing area when the component mounts
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, []);

    // Handler function when the TypingArea gains focus
    const handleFocus = () => {
        setIsFocused(true);
    };

    // Handler function when the TypingArea loses focus
    const handleBlur = () => {
        setIsFocused(false);
    };

    // Handler function for keydown events in the typing area
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        // Only handle key events if typing area is focused
        if (!isFocused) return;

        // Do not block standard shortcuts (e.g., Cmd+R, Ctrl+R)
        if (e.metaKey || e.ctrlKey || e.altKey) return;

        if (e.key === 'Tab') {
            e.preventDefault();
            onFetchNewBook();
        }

        // List of keys to ignore
        const ignoreKeys = ['Meta', 'Alt', 'Control', 'Shift', 'CapsLock'];

        // Ignore non-character keys
        if (ignoreKeys.includes(e.key)) return;

        // Prevent default behavior to avoid unwanted scrolling or other effects
        e.preventDefault();

        // If typing is finished, do not process further input
        if (isFinished) return;

        const { key } = e;

        // Handle backspace key for correcting mistakes
        if (key === 'Backspace') {
            if (currentCharIndex > 0) {
                // Decrement the current character index
                setCurrentCharIndex((prevIndex) => prevIndex - 1);

                // Update the status of the character to 'pending' and adjust errors if necessary
                setTypedChars((prevTypedChars) => {
                    const updatedChars = [...prevTypedChars];
                    // Decrement errors if the previous character was incorrect
                    if (updatedChars[currentCharIndex - 1].status === 'incorrect') {
                        setErrors((prevErrors) => prevErrors - 1);
                    }
                    updatedChars[currentCharIndex - 1].status = 'pending';
                    return updatedChars;
                });
            }
            return;
        }

        // Handle character input
        if (key.length === 1) {
            // Do not allow typing beyond the quote length
            if (currentCharIndex >= quoteCharacters.length) return;

            const currentChar = quoteCharacters[currentCharIndex];

            // Update the typed characters and statuses
            setTypedChars((prevTypedChars) => {
                const updatedChars = [...prevTypedChars];
                if (key === currentChar) {
                    // Correct character typed
                    updatedChars[currentCharIndex].status = 'correct';
                } else {
                    // Incorrect character typed
                    updatedChars[currentCharIndex].status = 'incorrect';
                    // Increment the error count
                    setErrors((prevErrors) => prevErrors + 1);
                }
                return updatedChars;
            });

            // Move to the next character
            setCurrentCharIndex((prevIndex) => prevIndex + 1);
        }
    };

    // Function to calculate Words Per Minute (WPM)
    const calculateWPM = () => {
        if (startTime) {
            const now = new Date();
            let timeDiffInMinutes = (now.getTime() - startTime.getTime()) / 1000 / 60;

            // Prevent division by zero or extremely small time intervals
            if (timeDiffInMinutes <= 0) {
                timeDiffInMinutes = 0.01; // Minimum time interval of 0.01 minute
            }

            const totalCharsTyped = currentCharIndex;
            const netWPM = ((totalCharsTyped - errors) / 5) / timeDiffInMinutes;

            // Ensure WPM is not negative
            const calculatedWPM = Math.round(netWPM > 0 ? netWPM : 0);
            setWpm(calculatedWPM);
        }
    };

    // Calculate typing accuracy as a percentage
    const accuracy =
        currentCharIndex > 0 ? Math.round(((currentCharIndex - errors) / currentCharIndex) * 100) : 100;

    // Function to record stats over time
    const recordStats = () => {
        if (startTime) {
            const now = new Date();
            const timeElapsed = (now.getTime() - startTime.getTime()) / 1000; // in seconds
            setStatsOverTime((prevStats) => [
                ...prevStats,
                { time: timeElapsed, wpm, accuracy },
            ]);
        }
    };

    // Function to render the quote with appropriate styling
    const renderQuote = () => {
        return typedChars.map((typedChar, index) => {
            let className = typedChar.status;

            // Highlight the current character if typing is not finished
            if (!isFinished && index === currentCharIndex) {
                className = 'current';
            }

            // Replace space character with a non-breaking space for proper rendering
            const displayChar = typedChar.char === ' ' ? '\u00A0' : typedChar.char;

            return (
                <span key={index} className={className}>
                    {displayChar}
                </span>
            );
        });
    };

    // Handler function for clicks on the typing area
    const handleClick = () => {
        if (textAreaRef.current) {
            textAreaRef.current.focus();
        }
    };

    return (
        <div
            className={`typing-area ${isFocused ? 'focused' : ''}`} // Apply CSS classes for styling
            tabIndex={0} // Make the div focusable
            onKeyDown={handleKeyDown} // Handle keydown events for typing
            ref={textAreaRef} // Attach the ref to the div
            onClick={handleClick} // Handle clicks to focus the typing area
            onFocus={handleFocus} // Handle focus events
            onBlur={handleBlur} // Handle blur events
        >
            {/* Progress bar showing typing progress */}
            <ProgressContainer currentNum={currentCharIndex} endNum={quoteCharacters.length} />

            {/* Display the quote with character statuses */}
            <div className="quote-display">{renderQuote()}</div>

            {/* Display typing statistics */}
            <div className="stats">
                <p>Errors: {errors}</p>
                <p>WPM: {wpm}</p>
                <p>Accuracy: {accuracy}%</p>
            </div>
        </div>
    );
};

export default TypingArea;