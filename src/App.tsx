import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import FilterModal from './components/FilterModal';
import UnsupportedScreenSize from './components/UnsupportedScreenSize'; // Import the new component
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';

// Import Material UI components
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FeedbackData } from './types';

// Generate the client for data fetching
const client = generateClient<Schema>();

// Constants for data fetching
const TEST_LIMIT = 10000; // random constant, I need to figure out how DynamoDB manages read access in prod environment

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

    // State to track progress for loading screen
    const [progress, setProgress] = useState(0);

    // State to determine if the screen size is supported
    const [isScreenSupported, setIsScreenSupported] = useState<boolean>(true);

    // Effect to check screen width and update state
    useEffect(() => {
        const checkScreenWidth = () => {
            if (window.innerWidth < 1100 || window.innerHeight <= 850) {
                setIsScreenSupported(false);
            } else {
                setIsScreenSupported(true);
            }
        };

        // Initial check
        checkScreenWidth();

        // Add event listener for window resize
        window.addEventListener('resize', checkScreenWidth);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('resize', checkScreenWidth);
        };
    }, []);

    /**
     * Fetches data from the backend API on component mount
     */
    useEffect(() => {
        let timer: NodeJS.Timeout;

        const fetchData = async () => {
            setLoading(true);
            try {
                // Simulate loading progress
                timer = setInterval(() => {
                    setProgress((oldProgress) => {
                        if (oldProgress >= 100) {
                            clearInterval(timer);
                            return 100;
                        }
                        const diff = Math.random() * 10;
                        return Math.min(oldProgress + diff, 100);
                    });
                }, 500);

                const data = await client.models.BookMetadata.list({ limit: TEST_LIMIT });
                if (data && data.data) {
                    // Filter out null values from quotes
                    const cleanedData: BookData[] = data.data.map((book) => ({
                        ...book,
                        smallQuotes: book.smallQuotes.filter(
                            (quote): quote is string => quote !== null && quote !== undefined
                        ),
                        mediumQuotes: book.mediumQuotes.filter(
                            (quote): quote is string => quote !== null && quote !== undefined
                        ),
                        largeQuotes: book.largeQuotes.filter(
                            (quote): quote is string => quote !== null && quote !== undefined
                        ),
                    }));

                    setBooksData(cleanedData);
                } else {
                    setError('No data received from server.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again later.');
            } finally {
                clearInterval(timer);
                setProgress(100);
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            clearInterval(timer);
        };
    }, []);

    /**
     * Selects a random quote from a book
     * @param forceNewBook - If true, selects a new book regardless of current book
     * @param selectedBook - If provided, use this book
     */
    const selectRandomQuote = (forceNewBook = false, selectedBook?: BookData | null) => {
        const dataToUse =
            filteredBooksData && filteredBooksData.length > 0 ? filteredBooksData : booksData;

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

        let book = selectedBook || currentBook;

        if (!book || forceNewBook) {
            // Filter books that have quotes of the desired type
            const booksWithQuotes = dataToUse.filter(
                (b) => b[quoteType] && b[quoteType].length > 0
            );

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

        // Get quotes of the selected type from the current book
        let quotes = book[quoteType];

        // If no quotes of the desired type, try other types
        if (!quotes || quotes.length === 0) {
            quotes = [...book.smallQuotes, ...book.mediumQuotes, ...book.largeQuotes];
            if (quotes.length === 0) {
                // No quotes available in the selected book
                setCurrentQuote(null);
                return;
            }
        }

        // Select a random quote from the available quotes
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setCurrentQuote(quotes[randomIndex]);
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
     * Effect to handle changes in filteredBooksData
     */
    useEffect(() => {
        if (filteredBooksData !== null) {
            // If currentBook is not in filteredBooksData, reset it
            if (
                currentBook &&
                !filteredBooksData.some((book) => book.bookId === currentBook.bookId)
            ) {
                setCurrentBook(null);
            }
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

    const handleApplyFilters = (filteredBooks: BookData[], selectedBook?: BookData | null) => {
        setFilteredBooksData(filteredBooks);
        setIsFilterModalOpen(false);

        if (selectedBook) {
            setCurrentBook(selectedBook);
            // Select a quote from the selected book
            selectRandomQuote(false, selectedBook);
        } else {
            // No specific book selected; reset currentBook
            setCurrentBook(null);
            // Select a random quote from the filtered books
            selectRandomQuote(true);
        }
    };

    const handleFeedbackSubmit = async (feedbackData: FeedbackData) => {
        try {
            const { errors, data: newFeedback } = await client.models.FeedbackData.create(
                feedbackData
            );

            if (errors) {
                console.error('Feedback submission errors:', errors);
            } else {
                console.log('Feedback submitted successfully:', newFeedback);
            }
        } catch (e) {
            console.error('Error submitting feedback:', e);
        }
    };

    // Handle loading state
    if (loading) {
        return (
            <Box sx={{ width: '100%', mt: 4 }}>
                <LinearProgress variant="determinate" value={progress} />
                <Typography variant="body1" align="center" sx={{ width: '25rem' }}>
                    Loading...
                </Typography>
            </Box>
        );
    }

    // Handle unsupported screen size
    if (!isScreenSupported) {
        return <UnsupportedScreenSize />;
    }

    // Handle error state
    if (error) {
        return (
            <Typography variant="body1" color="error" align="center" sx={{ mt: 4 }}>
                Error: {error}
            </Typography>
        );
    }

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
                <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                    No quotes available for the selected mode.
                </Typography>
            )}

            {/* Button to open filter modal */}
            <button className="btn browse" onClick={handleOpenFilterModal}>
                <span className="btn-label">Browse All Books</span>
            </button>
            {isFilterModalOpen && (
                <FilterModal
                    booksData={booksData}
                    onApplyFilters={handleApplyFilters}
                    onClose={handleCloseFilterModal}
                />
            )}

            {/* Footer component */}
            <Footer submitFeedback={handleFeedbackSubmit} />
        </div>
    );
}

export default App;
