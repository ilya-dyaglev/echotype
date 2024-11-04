import '../styles/Main.css';
import ProgressContainer from './ProgressContainer';
import TypingArea from './TypingArea';
import PropTypes from 'prop-types';

function Main({ activeMode, textData }) {
    return <div className="main">
            <ProgressContainer currentNum={1} endNum={101}/>
            <TypingArea activeMode={ activeMode } textData={textData}/>
        </div>
}

Main.propTypes = {
    activeMode: PropTypes.string,
    textData: PropTypes.string,
};

export default Main;
