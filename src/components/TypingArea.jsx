import '../styles/TypingArea.css';
import PropTypes from 'prop-types';

const TypingArea = ({ activeMode, textData }) => {
    return <div className="typing-area">
            <div className="text-data">{textData}</div>
        </div>
}

TypingArea.propTypes = {
    activeMode: PropTypes.string,
    textData: PropTypes.string, 
};

export default TypingArea;
