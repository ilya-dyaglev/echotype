import React, { useState, useMemo, useEffect, useCallback } from 'react';
import '../styles/FilterModal.css';
import { BookData } from '../App';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CustomTable from './CustomTable';

interface FilterModalProps {
    booksData: BookData[];
    onApplyFilters: (filteredBooks: BookData[], selectedBook?: BookData | null) => void;
    onClose: () => void;
}

interface TitleOption {
    title: string;
    firstLetter: string;
}

interface AuthorOption {
    author: string;
    firstLetter: string;
}

type Filters = Partial<Record<keyof BookData, (string | number)[]>>;

const FilterModal: React.FC<FilterModalProps> = ({ booksData, onApplyFilters, onClose }) => {
    // State variables for inputs (now arrays for multiple selections)
    const [titleInput, setTitleInput] = useState<TitleOption[]>([]);
    const [authorInput, setAuthorInput] = useState<AuthorOption[]>([]);
    const [languageInput, setLanguageInput] = useState<string[]>([]);
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

    // Generic function to compute filtered options
    const computeFilteredOptions = useCallback(
        <K extends keyof BookData, U = BookData[K]>(
            attribute: K,
            filters: Filters,
            formatter?: (value: BookData[K]) => U
        ): U[] => {
            let filtered: BookData[] = booksData;

            // Apply filters
            (Object.keys(filters) as (keyof BookData)[]).forEach((key) => {
                const selectedValues = filters[key];
                if (selectedValues && selectedValues.length > 0) {
                    const lowercasedValues = selectedValues.map((val) =>
                        typeof val === 'string' ? val.toLowerCase() : val
                    );
                    filtered = filtered.filter((book) => {
                        const bookValue = book[key];

                        if (typeof bookValue === 'string') {
                            return lowercasedValues.includes(bookValue.toLowerCase());
                        } else if (typeof bookValue === 'number') {
                            return lowercasedValues.includes(bookValue);
                        } else {
                            return false;
                        }
                    });
                }
            });

            // Extract unique values for the specified attribute
            const uniqueValues = Array.from(
                new Set(filtered.map((book) => book[attribute]))
            ) as BookData[K][];

            uniqueValues.sort();

            if (formatter) {
                return uniqueValues.map((val) => formatter(val));
            }

            return uniqueValues as unknown as U[];
        },
        [booksData]
    );

    // Filters for titles, authors, and languages
    const titleFilters = useMemo(() => {
        return {
            author: authorInput.map((author) => author.author),
            language: languageInput,
        };
    }, [authorInput, languageInput]);

    const authorFilters = useMemo(() => {
        return {
            title: titleInput.map((title) => title.title),
            language: languageInput,
        };
    }, [titleInput, languageInput]);

    const languageFilters = useMemo(() => {
        return {
            title: titleInput.map((title) => title.title),
            author: authorInput.map((author) => author.author),
        };
    }, [titleInput, authorInput]);

    // Compute options for titles, authors, and languages
    const titles = useMemo<TitleOption[]>(() => {
        return computeFilteredOptions<'title', TitleOption>(
            'title',
            titleFilters,
            (title) => ({
                title: title,
                firstLetter: title[0].toUpperCase(),
            })
        );
    }, [computeFilteredOptions, titleFilters]);

    const authors = useMemo<AuthorOption[]>(() => {
        return computeFilteredOptions<'author', AuthorOption>(
            'author',
            authorFilters,
            (author) => ({
                author: author,
                firstLetter: author[0].toUpperCase(),
            })
        );
    }, [computeFilteredOptions, authorFilters]);

    const languages = useMemo(() => {
        return computeFilteredOptions<'language', string>('language', languageFilters);
    }, [computeFilteredOptions, languageFilters]);

    // Compute filteredBooks based on current inputs
    const filteredBooks = useMemo(() => {
        const filters: Filters = {
            title: titleInput.map((title) => title.title),
            author: authorInput.map((author) => author.author),
            language: languageInput,
        };

        let filtered = booksData;

        // Apply filters
        (Object.keys(filters) as (keyof BookData)[]).forEach((key) => {
            const selectedValues = filters[key];
            if (selectedValues && selectedValues.length > 0) {
                const lowercasedValues = selectedValues.map((val) =>
                    typeof val === 'string' ? val.toLowerCase() : val
                );
                filtered = filtered.filter((book) => {
                    const bookValue = book[key];

                    if (typeof bookValue === 'string') {
                        return lowercasedValues.includes(bookValue.toLowerCase());
                    } else if (typeof bookValue === 'number') {
                        return lowercasedValues.includes(bookValue);
                    } else {
                        return false;
                    }
                });
            }
        });

        return filtered;
    }, [booksData, titleInput, authorInput, languageInput]);

    // Effect to reset selectedBookId if selected book is not in filteredBooks
    useEffect(() => {
        if (selectedBookId) {
            const selectedBookExists = filteredBooks.some(
                (book) => book.bookId === selectedBookId
            );
            if (!selectedBookExists) {
                setSelectedBookId(null);
            }
        }
    }, [filteredBooks, selectedBookId]);

    const handleApplyFilters = useCallback(() => {
        const selectedBook =
            filteredBooks.find((book) => book.bookId === selectedBookId) || null;
        onApplyFilters(filteredBooks, selectedBook);
        onClose();
    }, [filteredBooks, selectedBookId, onApplyFilters, onClose]);

    const columns = useMemo(
        () => [
            { field: 'title', headerName: 'Title', flex: 1 },
            { field: 'author', headerName: 'Author', flex: 1 },
            { field: 'language', headerName: 'Language', width: 120 },
            {
                field: 'releaseDate',
                headerName: 'Release Date',
                width: 150
            },
        ],
        []
    );

    const rows = useMemo(() => {
        return filteredBooks.map((book) => ({
            id: book.bookId,
            title: book.title,
            author: book.author,
            language: book.language,
            releaseDate: new Date(book.releaseDate).toLocaleDateString(),
        }));
    }, [filteredBooks]);

    const modalStyle = useMemo(
        () => ({
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxHeight: '80vh',
            bgcolor: '#1C2126',
            border: '1px solid #3B4A54',
            borderRadius: '0.5rem',
            boxShadow: 24,
            p: 4,
            color: '#E5E8EB',
            overflowY: 'auto',
        }),
        []
    );

    const handleResetFilters = useCallback(() => {
        setTitleInput([]);
        setAuthorInput([]);
        setLanguageInput([]);
        setSelectedBookId(null);
    }, []);

    const groupByFirstLetter = useCallback(
        (option: { firstLetter: string }) => option.firstLetter,
        []
    );

    const getOptionLabelTitle = useCallback((option: TitleOption) => option.title, []);
    const getOptionLabelAuthor = useCallback((option: AuthorOption) => option.author, []);

    const inputStyle = {
        mb: 2,
        '& input': {
            color: "#fff",
            borderColor: "#fff"
        },
    }

    return (
        <Modal
            open={true}
            onClose={onClose}
            aria-labelledby="filter-modal-title"
            aria-describedby="filter-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography variant="h5" component="h2" sx={{ mb: 2, alignSelf: 'center', textAlign: 'center'  }}>
                   Select Available Books
                </Typography>

                {/* Title Autocomplete with grouping and multiple selection */}
                <Autocomplete
                    multiple
                    value={titleInput}
                    onChange={(_event, newValue: TitleOption[]) => {
                        setTitleInput(newValue);
                    }}
                    options={titles}
                    groupBy={groupByFirstLetter}
                    getOptionLabel={getOptionLabelTitle}
                    renderInput={(params) => (
                        <TextField {...params} label="Title" variant="outlined"
                        />
                    )}
                    sx={inputStyle}
                />

                {/* Author Autocomplete with grouping and multiple selection */}
                <Autocomplete
                    multiple
                    value={authorInput}
                    onChange={(_event, newValue: AuthorOption[]) => {
                        setAuthorInput(newValue);
                    }}
                    options={authors}
                    groupBy={groupByFirstLetter}
                    getOptionLabel={getOptionLabelAuthor}
                    renderInput={(params) => (
                        <TextField {...params} label="Author" variant="outlined" />
                    )}
                    sx={inputStyle}
                />

                {/* Language Autocomplete with multiselect */}
                <Autocomplete
                    multiple
                    value={languageInput}
                    onChange={(_event, newValue: string[]) => {
                        setLanguageInput(newValue);
                    }}
                    options={languages}
                    renderInput={(params) => (
                        <TextField {...params} label="Language" variant="outlined" />
                    )}
                    sx={inputStyle}
                />

                <Typography variant="h6" component="h3" sx={{ mt: 4, mb: 2 }}>
                    Available Books:
                </Typography>
                <div className="book-list-container">
                    <CustomTable
                        columns={columns}
                        rows={rows}
                        onRowClick={(rowId) => setSelectedBookId(rowId)}
                        selectedRowId={selectedBookId}
                    />
                </div>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleResetFilters}
                        sx={{ mr: 2 }}
                    >
                        Reset Filters
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleApplyFilters}
                        sx={{ mr: 2 }}
                    >
                        Apply Filters
                    </Button>
                    <Button variant="outlined" color="inherit" onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default FilterModal;
