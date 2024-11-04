import PropTypes from 'prop-types';

const ProgressLabel = ({currentNum, endNum, progress}) => {
    return <div className="progress-label">
            <div>
                <span>{currentNum}</span>
                <span>/</span>
                <span>{endNum}</span>
            </div>
            <span>{progress}%</span>
        </div>
}

ProgressLabel.propTypes = {
    currentNum: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    endNum: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    progress: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

export default ProgressLabel;
