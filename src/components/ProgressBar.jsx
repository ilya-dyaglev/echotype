import PropTypes from "prop-types";

const ProgressBar = ({ progress }) => {
    return <div className="progress-bar">
            <div style={{width: `${progress}%`}}></div>
        </div>
}

ProgressBar.propTypes = {
    progress: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

export default ProgressBar;
