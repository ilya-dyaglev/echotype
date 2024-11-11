import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import FilterModal from './components/FilterModal';
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';

// Generate the client for data fetching
const client = generateClient<Schema>();

// Constants for data fetching
const TEST_LIMIT = 10000; // I'll probably fix this issue in the future, currently it's not really efficient.

// Interface for fetched data
export interface BookData {
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

// Main App component
function App() {
    // State for the active typing mode
    const [activeMode, setActiveMode] = useState<'short' | 'medium' | 'long'>('short');

    // State for fetched books data
    const [booksData, setBooksData] = useState<BookData[]>([]);

    // State for the current book
    const [currentBook, setCurrentBook] = useState<BookData | null>(null);

    // State for the current quote
    const [currentQuote, setCurrentQuote] = useState<string | null>(null);

    // State to track if data is being loaded
    const [loading, setLoading] = useState(true);

    // State to handle errors
    const [error, setError] = useState<string | null>(null);

    // State to control the visibility of the filter modal
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    // State to store filtered books
    const [filteredBooksData, setFilteredBooksData] = useState<BookData[] | null>(null);

    /**
     * Fetches data from the backend API on component mount
     */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await client.models.BookMetadata.list({ limit: TEST_LIMIT });
                if (data && data.data) {
                    // Filter out null values from quotes
                    const cleanedData: BookData[] = data.data.map((book) => ({
                        ...book,
                        smallQuotes: book.smallQuotes
                            .filter((quote): quote is string => quote !== null && quote !== undefined),
                        mediumQuotes: book.mediumQuotes
                            .filter((quote): quote is string => quote !== null && quote !== undefined),
                        largeQuotes: book.largeQuotes
                            .filter((quote): quote is string => quote !== null && quote !== undefined),
                    }));

                    setBooksData(cleanedData);
                } else {
                    setError('No data received from server.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    /**
     * Selects a random quote from a book
     * @param forceNewBook - If true, selects a new book regardless of current book
     */
    const selectRandomQuote = (forceNewBook = false) => {
        const dataToUse = filteredBooksData && filteredBooksData.length > 0 ? filteredBooksData : booksData;

        if (dataToUse.length === 0) {
            setCurrentQuote(null);
            setCurrentBook(null);
            return;
        }

        // Map activeMode to the corresponding quote type
        const modeMapping = {
            short: 'smallQuotes',
            medium: 'mediumQuotes',
            long: 'largeQuotes',
        } as const;

        const quoteType = modeMapping[activeMode];

        let book = currentBook;

        // If forceNewBook is true or there's no current book, select a new one
        if (!book || forceNewBook) {
            // Filter books that have quotes of the desired type
            const booksWithQuotes = dataToUse.filter((b) => b[quoteType] && b[quoteType].length > 0);
            if (booksWithQuotes.length === 0) {
                // No books have quotes of the selected type
                setCurrentQuote(null);
                setCurrentBook(null);
                return;
            }

            // Select a new book from those that have the desired quote type
            const randomBookIndex = Math.floor(Math.random() * booksWithQuotes.length);
            book = booksWithQuotes[randomBookIndex];
            setCurrentBook(book);
        }

        // Attempt to get quotes of the selected type from the current book
        let quotes = book[quoteType];

        // If the current book doesn't have quotes of the selected type, find another book
        if (!quotes || quotes.length === 0) {
            const booksWithQuotes = dataToUse.filter((b) => b[quoteType] && b[quoteType].length > 0);
            if (booksWithQuotes.length === 0) {
                // No books have quotes of the selected type
                setCurrentQuote(null);
                setCurrentBook(null);
                return;
            }

            // Select a new book from those that have the desired quote type
            const randomBookIndex = Math.floor(Math.random() * booksWithQuotes.length);
            book = booksWithQuotes[randomBookIndex];
            setCurrentBook(book);
            quotes = book[quoteType];
        }

        // Select a random quote from the quotes array
        if (quotes && quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setCurrentQuote(quotes[randomIndex]);
        } else {
            setCurrentQuote(null);
        }
    };

    /**
     * Effect to select a random quote when data is loaded or active mode changes
     */
    useEffect(() => {
        if (!loading) {
            selectRandomQuote();
        }
    }, [loading, activeMode]);

    /**
     * Effect to select a random quote when filteredBooksData changes
     */
    useEffect(() => {
        if (filteredBooksData !== null) {
            selectRandomQuote(true);
        }
    }, [filteredBooksData]);

    /**
     * Handler for changing the active typing mode
     * @param mode - The new active mode ('short', 'medium', or 'long')
     */
    const handleModeChange = (mode: 'short' | 'medium' | 'long') => {
        setActiveMode(mode);
    };

    /**
     * Handler for selecting a new quote
     * Selects another quote from a new book
     */
    const handleFetchNewBook = () => {
        selectRandomQuote(true); // Force selection of a new book
    };

    const handleOpenFilterModal = () => {
        setIsFilterModalOpen(true);
    };

    const handleCloseFilterModal = () => {
        setIsFilterModalOpen(false);
    };

    const handleApplyFilters = (filteredBooks: BookData[]) => {
        setFilteredBooksData(filteredBooks);
        setIsFilterModalOpen(false);
    };

    // Handle loading state
    if (loading) return <div>Loading...</div>;

    // Handle error state
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container">
            {/* Header component with mode selection */}
            <Header setActiveMode={handleModeChange} onFetchNewBook={handleFetchNewBook} />

            {/* Main component with the current quote and book info */}
            {currentQuote && currentBook ? (
                <Main
                    activeMode={activeMode}
                    currentQuote={currentQuote}
                    currentBook={currentBook}
                    onFetchNewBook={handleFetchNewBook}
                />
            ) : (
                <div>No quotes available for the selected mode.</div>
            )}

            {/* Button to open filter modal */}
            <button className="filter-button" onClick={handleOpenFilterModal}>
                <span className="btn-label">Browse Books</span>
            </button>

            {isFilterModalOpen && (
                <FilterModal
                    booksData={booksData}
                    onApplyFilters={handleApplyFilters}
                    onClose={handleCloseFilterModal}
                />
            )}

            {/* Footer component */}
            <Footer />
        </div>
    );
}

export default App;
