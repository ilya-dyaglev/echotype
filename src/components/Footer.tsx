import React, { useState } from 'react';
import '../styles/Footer.css';
import FeedbackModal from './FeedbackModal';
import { FeedbackData } from '../types';

interface FooterProps {
    submitFeedback: (feedbackData: FeedbackData) => void;
}

const Footer: React.FC<FooterProps> = ({ submitFeedback }) => {
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

    const handleOpenFeedbackModal = () => {
        setIsFeedbackModalOpen(true);
    };

    const handleCloseFeedbackModal = () => {
        setIsFeedbackModalOpen(false);
    };

    const handleFeedbackSubmit = (feedbackData: FeedbackData) => {
        submitFeedback(feedbackData);
    };

    return (
        <div className="footer">
            <div className="feedbackbtn-container">
                <button className="btn btn-feedback" onClick={handleOpenFeedbackModal}>
                    <span className="btn-label">Leave Feedback</span>
                </button>

                <FeedbackModal
                    open={isFeedbackModalOpen}
                    onClose={handleCloseFeedbackModal}
                    onSubmit={handleFeedbackSubmit}
                />
            </div>
            <div className="copyright-container">
                <div className="label">
                    built by <span>@idyaglev</span>
                </div>
                <div className="footer-image-icon"></div>
            </div>
        </div>
    );
};

export default Footer;
