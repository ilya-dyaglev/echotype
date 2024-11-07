import '../styles/Header.css';
import { useState } from 'react';
import ControlBar from './ControlBar';
import CTA from './CTA';
import { fetchTypingText } from '../api';

interface HeaderProps {
    setActiveMode: (mode: string) => void;
    setTextData: (text: string) => void;
    setFetchedData: (data: Record<string, any>) => void; // Added setFetchedData prop
}

const Header: React.FC<HeaderProps> = ({ setActiveMode, setTextData, setFetchedData }) => {
    const [textDataLocal, setTextDataLocal] = useState('');
    const [loading, setLoading] = useState(false);

    const handleButtonClick = async (activeMode: string) => {
        setActiveMode(activeMode);
        setLoading(true);
        console.log('start');
        try {
            const fetchedText = await fetchTypingText(activeMode);
            setTextDataLocal(fetchedText);
            setTextData(fetchedText);
            console.log(fetchedText);

            // Example: Use setFetchedData to update additional data if needed
            const additionalData = { exampleKey: 'exampleValue' }; // Replace with actual data
            setFetchedData(additionalData);
        } catch (error) {
            console.error('Error fetching text data:', error);
            setTextData('Failed to fetch text data.');
        } finally {
            console.log('done');
            setLoading(false);
        }
    };

    return (
        <div className="header">
            <div className="logo">
                <div className="logo-icon"></div>
                <span>EchoType</span>
            </div>
            <ControlBar setActiveMode={setActiveMode} onButtonClick={handleButtonClick} />
            <CTA />
        </div>
    );
};

export default Header;
