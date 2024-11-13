import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Alert,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import dayjs from 'dayjs'; // For formatting dates
import { FeedbackData } from '../types';

interface FeedbackModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (feedbackData: FeedbackData) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ open, onClose, onSubmit }) => {
    const [feedbackContent, setFeedbackContent] = useState('');
    const [agreeToProcessing, setAgreeToProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = () => {
        if (!agreeToProcessing) {
            setErrorMessage('You must agree to the processing of your personal data.');
            return;
        }

        if (feedbackContent.trim() === '') {
            setErrorMessage('Feedback content cannot be empty.');
            return;
        }

        const feedbackData: FeedbackData = {
            createdAt: dayjs().toISOString(),
            updatedAt: dayjs().toISOString(),
            feedbackId: uuidv4(), // Generates a unique ID
            userId: null, // Default to null
            emailDestination: 'idyaglev@echotype.io',
            feedbackContent: feedbackContent.trim(),
        };

        onSubmit(feedbackData);
        onClose();
    };

    const modalStyle = {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        bgcolor: '#1C2126',
        border: '1px solid #3B4A54',
        borderRadius: '0.5rem',
        boxShadow: 24,
        p: 4,
        color: '#E5E8EB',
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="feedback-modal-title">
            <Box sx={modalStyle}>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                   Help us improve
                </Typography>

                {errorMessage && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMessage}
                    </Alert>
                )}

                <TextField
                    label="Your Feedback"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={feedbackContent}
                    onChange={(e) => setFeedbackContent(e.target.value)}
                    sx={{
                        mb: 2,
                        '& .MuiInputBase-root': {
                            color: '#E5E8EB',
                        },
                        '& .MuiInputLabel-root': {
                            color: '#E5E8EB',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#3B4A54',
                            },
                            '&:hover fieldset': {
                                borderColor: '#E5E8EB',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#E5E8EB',
                            },
                        },
                    }}
                    InputLabelProps={{
                        style: { color: '#E5E8EB' },
                    }}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={agreeToProcessing}
                            onChange={(e) => setAgreeToProcessing(e.target.checked)}
                            sx={{
                                color: '#E5E8EB',
                                '&.Mui-checked': {
                                    color: '#E5E8EB',
                                },
                            }}
                        />
                    }
                    label="I agree to the processing of my personal data for providing better feedback."
                    sx={{ color: '#E5E8EB', mb: 2 }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" color="inherit" onClick={onClose} sx={{ mr: 2 }}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit Feedback
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default FeedbackModal;