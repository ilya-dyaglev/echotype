import React, {useState} from 'react';
import '../styles/Main.css';
import TypingArea from './TypingArea';
import Results from './Results';


interface BookData {
    bookId: string;
    sourceId: number;
    sourceUrl: string;
    title: string;
    author: string;
    releaseDate: string;
    language: string;
    license: string;
    smallQuotes: string[];
    mediumQuotes: string[];
    largeQuotes: string[];
    createdAt: string;
    updatedAt: string;
}

interface TypingStats {
    wpm: number;
    accuracy: number;
    errors: number;
    timeTaken: number; // in seconds
    charsTyped: number;
    statsOverTime: Array<{ time: number; wpm: number; accuracy: number }>;
}

interface MainProps {
    activeMode: 'short' | 'medium' | 'long';
    currentQuote: string;
    currentBook: BookData;
    onFetchNewBook: () => void;
}

const Main: React.FC<MainProps> = ({ currentQuote, currentBook, onFetchNewBook }) => {
    // State to track whether typing is finished
    const [typingFinished, setTypingFinished] = useState(false);

    // State to store typing statistics
    const [typingStats, setTypingStats] = useState<TypingStats | null>(null);

    // Handler function when typing is finished
    const handleTypingFinish = (stats: TypingStats) => {
        setTypingStats(stats);
        setTypingFinished(true);
    };

    // Handler function to retake the test
    const handleRetake = () => {
        // Reset typing state
        setTypingFinished(false);
        setTypingStats(null);
    };

    // Function to format ISO date strings into a readable format
    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="main">
            {typingFinished && typingStats ? (
                <Results typingStats={typingStats} onRetake={handleRetake} />
            ) : (
                <>
                    <TypingArea textData={currentQuote} onFinish={handleTypingFinish} onFetchNewBook={onFetchNewBook} />
                    {/* Display additional information about the book */}
                    <div className="additional-info">
                        <pre>{`Title: ${currentBook.title}`}</pre>
                        <pre>{`Author: ${currentBook.author}`}</pre>
                        <pre>{`Released on: ${formatDate(currentBook.releaseDate)}`}</pre>
                    </div>
                </>
            )}
        </div>
    );
};

export default Main;