import React from 'react';
import '../styles/UnsupportedScreenSize.css';

const UnsupportedScreenSize: React.FC = () => {
    return (
        <div className="unsupported-screen-size">
            <span>We only support the desktop version. Please use a device with a larger screen.</span>
        </div>
    );
};

export default UnsupportedScreenSize;
