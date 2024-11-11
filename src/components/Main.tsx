import React from 'react';
import '../styles/Main.css';
import TypingArea from './TypingArea';

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

interface MainProps {
    activeMode: 'short' | 'medium' | 'long';
    currentQuote: string;
    currentBook: BookData;
}

const Main: React.FC<MainProps> = ({ currentQuote, currentBook }) => {
    /**
     * Function to format ISO date strings into a readable format
     * @param isoString - The ISO date string to format
     * @returns A formatted date string
     */
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
            <TypingArea textData={currentQuote} />
            {/* Display book's metadata - to enhance in the future */}
            <div>
                <pre>{`Title: ${currentBook.title}`} (<a href={`https://www.gutenberg.org/cache/epub/${currentBook.sourceId}/pg${currentBook.sourceId}-images.html`}><span>read full version</span></a>)</pre>
                <pre>{`Author: ${currentBook.author}`}</pre>
                <pre>{`Released on: ${formatDate(currentBook.releaseDate)}`}</pre>
            </div>
        </div>
    );
};

export default Main;
