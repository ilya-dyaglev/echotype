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
                <div className="logo-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M14.6667 3.75757C14.6667 4.6703 13.2795 5.46523 11.23 5.8788C13.2795 6.29233 14.6667 7.08727 14.6667 8C14.6667 8.91273 13.2795 9.70767 11.23 10.1212C13.2795 10.5348 14.6667 11.3297 14.6667 12.2424C14.6667 13.5813 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 13.5813 1.33333 12.2424C1.33333 11.3297 2.72048 10.5348 4.77 10.1212C2.72048 9.70767 1.33333 8.91273 1.33333 8C1.33333 7.08727 2.72048 6.29233 4.77 5.8788C2.72048 5.46523 1.33333 4.6703 1.33333 3.75757C1.33333 2.4187 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 2.4187 14.6667 3.75757Z"
                              fill="white"/>
                    </svg>
                </div>
                <span>echoType</span>
            </div>
            <ControlBar setActiveMode={setActiveMode} onFetchNewBook={onFetchNewBook}/>
            <CTA/>
        </div>
    );
};

export default Header;
