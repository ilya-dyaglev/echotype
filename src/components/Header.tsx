import '../styles/Header.css';
import ControlBar from './ControlBar';
import CTA from './CTA';
import {BookData} from "../App.tsx";

interface HeaderProps {
    setActiveMode: (mode: 'short' | 'medium' | 'long') => void;
    onFetchNewBook: (book: BookData[]) => void;
}

const Header: React.FC<HeaderProps> = ({ setActiveMode, onFetchNewBook  }) => {
    return (
        <div className="header">
            <div className="logo">
                <div className="logo-icon"></div>
                <span>echoType</span>
            </div>
            <ControlBar setActiveMode={setActiveMode} onFetchNewBook={onFetchNewBook} />
            <CTA />
        </div>
    );
};

export default Header;
