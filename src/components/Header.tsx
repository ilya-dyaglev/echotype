import '../styles/Header.css';
import ControlBar from './ControlBar';
import CTA from './CTA';

interface HeaderProps {
    setActiveMode: (mode: 'short' | 'medium' | 'long') => void;
}

const Header: React.FC<HeaderProps> = ({ setActiveMode }) => {
    return (
        <div className="header">
            <div className="logo">
                <div className="logo-icon"></div>
                <span>echoType</span>
            </div>
            <ControlBar setActiveMode={setActiveMode} />
            <CTA />
        </div>
    );
};

export default Header;
