import '../styles/Header.css';
import { useState } from 'react';
import ControlBar from './ControlBar';
import CTA from './CTA';
import PropTypes from 'prop-types';
import { fetchTypingText } from '../api';

const Header = ({ setActiveMode, setTextData }) => {
    
    const [textData, setTextDataLocal] = useState('');
    const [loading, setLoading] = useState(false);

    const handleButtonClick = async (activeMode) => {
        setActiveMode(activeMode);
        setLoading(true);
        console.log('start')
        try {
            const fetchedText = await fetchTypingText(activeMode);
            setTextDataLocal(fetchedText)
            setTextData(textData);
            console.log(textData)
        } catch (error) {
            console.error('Error fetching text data:', error);
            setTextData('Failed to fetch text data.');
        } finally {
            console.log('done')
            setLoading(false);
        }
    };

    return ( 
        <div className="header">
            <div className="logo">
                <div className="logo-icon"></div>
                <span>EchoType</span>
        </div>
            <ControlBar setActiveMode={setActiveMode} onButtonClick={handleButtonClick}/>
            <CTA/>
        </div>
    )}

Header.propTypes = {
    setActiveMode: PropTypes.func,
    onButtonClick: PropTypes.func,
    setTextData: PropTypes.func,
};

export default Header;
