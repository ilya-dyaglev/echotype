import "../styles/ProgressContainer.css";
import PropTypes from 'prop-types';
import ProgressLabel from "./ProgressLabel";
import ProgressBar from "./ProgressBar";

const ProgressContainer = ({currentNum, endNum}) => {
    const progress = Math.round(( currentNum / endNum ) * 100);
    return <div className="progress-container">
            <ProgressLabel currentNum={currentNum} endNum={endNum} progress={progress}/>
            <ProgressBar progress={Math.round(progress)}/>
        </div>
}

ProgressContainer.propTypes = {
    currentNum: PropTypes.number,
    endNum: PropTypes.number,
}

export default ProgressContainer;
