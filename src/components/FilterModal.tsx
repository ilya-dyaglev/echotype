import React, { useState, useMemo } from "react";
import '../styles/FilterModal.css';
import { BookData } from "../App";

interface FilterModalProps {
    booksData: BookData[];
    onApplyFilters: (filteredBooks: BookData[]) => void;
    onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ booksData, onApplyFilters, onClose }) => {
    const [titleInput, setTitleInput] = useState('');
    const [authorInput, setAuthorInput] = useState('');
    const [language, setLanguage] = useState('');
    const [bookDisplayCount, setBookDisplayCount] = useState(6);

    // Memoize available languages
    const availableLanguages = useMemo(() => {
        return Array.from(new Set(booksData.map((book) => book.language))).sort();
    }, [booksData]);

    // Memoize filteredBooks
    const filteredBooks = useMemo(() => {
        let filtered = booksData;

        if (titleInput) {
            filtered = filtered.filter((book) =>
                book.title.toLowerCase().includes(titleInput.toLowerCase())
            );
        }

        if (authorInput) {
            filtered = filtered.filter((book) =>
                book.author.toLowerCase().includes(authorInput.toLowerCase())
            );
        }

        if (language) {
            filtered = filtered.filter((book) =>
                book.language.toLowerCase() === language.toLowerCase()
            );
        }

        return filtered;
    }, [titleInput, authorInput, language, booksData]);

    // Memoize title suggestions
    const titleSuggestions = useMemo(() => {
        if (titleInput) {
            return Array.from(new Set(
                booksData
                    .filter((book) =>
                        book.title.toLowerCase().startsWith(titleInput.toLowerCase())
                    )
                    .map((book) => book.title)
            )).sort().slice(0, 6);
        } else {
            return [];
        }
    }, [titleInput, booksData]);

    // Memoize author suggestions
    const authorSuggestions = useMemo(() => {
        if (authorInput) {
            return Array.from(new Set(
                booksData
                    .filter((book) =>
                        book.author.toLowerCase().startsWith(authorInput.toLowerCase())
                    )
                    .map((book) => book.author)
            )).sort().slice(0, 6);
        } else {
            return [];
        }
    }, [authorInput, booksData]);

    // Compute books to show
    const booksToShow = useMemo(() => {
        return filteredBooks.slice(0, bookDisplayCount);
    }, [filteredBooks, bookDisplayCount]);

    const handleLoadMoreBooks = () => {
        setBookDisplayCount((prevCount) => prevCount + 6);
    };

    const handleApplyFilters = () => {
        onApplyFilters(filteredBooks);
        onClose();
    };

    return (
        <div className="filter-modal">
            <div className="filter-modal-content">
                <h2>Browse Available Books</h2>
                <div className="filter-input">
                    <label>
                        Title:
                        <input
                            type="text"
                            value={titleInput}
                            onChange={(e) => setTitleInput(e.target.value)}
                            autoComplete="off"
                        />
                        {titleSuggestions.length > 0 && (
                            <ul className="suggestions">
                                {titleSuggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => setTitleInput(suggestion)}
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </label>
                </div>
                <div className="filter-input">
                    <label>
                        Author:
                        <input
                            type="text"
                            value={authorInput}
                            onChange={(e) => setAuthorInput(e.target.value)}
                            autoComplete="off"
                        />
                        {authorSuggestions.length > 0 && (
                            <ul className="suggestions">
                                {authorSuggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => setAuthorInput(suggestion)}
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </label>
                </div>
                <div className="filter-input">
                    <label>Language:</label>
                    <div className="language-options">
                        {availableLanguages.map((lang, index) => (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="language"
                                    value={lang}
                                    checked={language === lang}
                                    onChange={(e) => setLanguage(e.target.value)}
                                />
                                {lang}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="book-list">
                    <h3>Available Books:</h3>
                    <div className="book-list-container">
                        {booksToShow.map((book) => (
                            <div key={book.bookId} className="book-item">
                                <p><strong>{book.title}</strong> by {book.author}</p>
                            </div>
                        ))}
                        {booksToShow.length < filteredBooks.length && (
                            <button className="load-more-button" onClick={handleLoadMoreBooks}>
                                Load More
                            </button>
                        )}
                    </div>
                </div>
                <div className="filter-buttons">
                    <button onClick={handleApplyFilters}>Apply Filters</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
