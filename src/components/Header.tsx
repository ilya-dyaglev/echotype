import '../styles/Header.css';
import ControlBar from './ControlBar';
import CTA from './CTA';
import { fetchTypingText } from '../api.ts';

interface HeaderProps {
    setActiveMode: (mode: 'short' | 'medium' | 'long') => void;
    setTextData: (text: string) => void;
    setFetchedData: (data: Record<string, any>) => void;
}

const Header: React.FC<HeaderProps> = ({ setActiveMode, setTextData, setFetchedData }) => {
    const handleButtonClick = async (activeMode: 'short' | 'medium' | 'long') => {
        setActiveMode(activeMode);
        console.log('start');
        try {
            const fetchedText = await fetchTypingText(activeMode);
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
